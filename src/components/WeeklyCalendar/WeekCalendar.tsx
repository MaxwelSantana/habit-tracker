
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, PixelRatio, Text, StyleSheet } from "react-native";
import Scroller from './Scroller';
import WeekDay from "./WeekDay";

//import moment from 'moment/min/moment-with-locales';
import moment from "../Moment";

export default class WeekCalendar extends Component {
    static propTypes = {
        selectedDate: PropTypes.any,
        numDaysInWeek: PropTypes.number,
        firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
        maxDayComponentSize: PropTypes.number,
        minDayComponentSize: PropTypes.number,
        localeName: PropTypes.oneOf(moment.locales()),
        style: PropTypes.object,

        onDateSelected: PropTypes.func,
        onWeekChanged: PropTypes.func,
    }

    static defaultProps = {
        localeName: 'pt-br',
        firstDayOfWeek: 1,
        numDaysInWeek: 7,
        maxDayComponentSize: 80,
        minDayComponentSize: 10,
        style: { flex: 1 },
        selectedDate: moment(),
    }

    constructor(props) {
        super(props);
        this.numWeeksScroll = 40;
        const { localeName, firstDayOfWeek } = this.props;

        this.updateLocale(localeName, firstDayOfWeek);

        const selectedDate = this.setLocale(this.props.selectedDate);

        const { today, startingDate } = this.updateStartingDate();
        const [dateList, initialScrollerIndex, todayScrollerIndex] = [0, 0, 0];
        this.state = {
            selectedDate,
            dayComponentWidth: 0,
            today,
            startingDate,
            dateList,
            initialScrollerIndex,
            todayScrollerIndex,
        }

        this.layout = {};
    }

    componentDidUpdate(prevProps, prevState) {
        const { localeName, firstDayOfWeek } = this.props;
        if (prevProps.localeName !== localeName || prevProps.firstDayOfWeek !== firstDayOfWeek) {
            this.updateLocale(localeName, firstDayOfWeek);
        }
    }

    // Check whether two datetimes are of the same value.  Supports Moment date,
    // JS date, or ISO 8601 strings.
    // Returns true if the datetimes values are the same; false otherwise.
    compareDates = (date1, date2) => {
        if (date1 && date1.valueOf && date2 && date2.valueOf) {
            return moment(date1).isSame(date2, "day");
        } else {
            return JSON.stringify(date1) === JSON.stringify(date2);
        }
    }

    updateLocale = (locale, firstDayOfWeek) => {
        moment.updateLocale(locale, {
            week: {
                dow: firstDayOfWeek
            }
        });
    }

    //Function that checks if the locale is passed to the component and sets it to the passed date
    setLocale = date => {
        let _date = date && moment(date);
        if (_date) {
            _date.set({ hour: 12 }); // keep date the same regardless of timezone shifts
            if (this.props.localeName) {
                _date = _date.locale(this.props.localeName);
            }
        }
        return _date;
    }

    onLayout = event => {
        if (event.nativeEvent.layout.width === this.layout.width) {
            return;
        }
        if (this.onLayoutTimer) {
            clearTimeout(this.onLayoutTimer);
        }
        this.layout = event.nativeEvent.layout;
        this.onLayoutTimer = setTimeout(() => {
            this.onLayoutDebounce(this.layout);
            this.onLayoutTimer = null;
        }, 100);
    }

    onLayoutDebounce = layout => {
        const {
            numDaysInWeek,
            maxDayComponentSize,
            minDayComponentSize,
        } = this.props;
        const csWidth = PixelRatio.roundToNearestPixel(layout.width);
        let dayComponentWidth = csWidth / numDaysInWeek;

        dayComponentWidth = Math.min(dayComponentWidth, maxDayComponentSize);
        dayComponentWidth = Math.max(dayComponentWidth, minDayComponentSize);

        dayComponentWidth = Math.round(dayComponentWidth * 0.9);

        this.setState({
            dayComponentWidth,
            ...this.createDays(this.state.today, this.state.startingDate),
        });
    }

    updateStartingDate = () => {
        const today = moment();
        const startingDate = this.setLocale(today.clone());
        startingDate.startOf("week");
        return { today, startingDate };
    }

    createDays = (today, startingDate) => {
        let days = [];
        let dateList = [];
        let initialScrollerIndex;
        let todayScrollerIndex;
        const weeks = this.numWeeksScroll;
        const numDays = weeks * 7;

        const startLeftOffsetDate = startingDate.clone().subtract(weeks / 2, "weeks");

        for (let i = 0; i < numDays; i++) {
            let date = this.setLocale(startLeftOffsetDate.clone().add(i, "days"));

            if (date.isSame(startingDate, "day")) {
                initialScrollerIndex = i;
            }

            if (date.isSame(today, "day")) {
                todayScrollerIndex = i;
            }
            dateList.push({ date });
        }

        return { dateList, initialScrollerIndex, todayScrollerIndex };
    }

    //Handling press on date/selecting date
    onDateSelected = selectedDate => {
        this.setState({ selectedDate });
        const _selectedDate = selectedDate && selectedDate.clone();
        this.props.onDateSelected && this.props.onDateSelected(_selectedDate);
    }

    onWeekChanged = (weekStartDate, weekEndDate) => {
        const { selectedDate } = this.state;

        if (selectedDate && !selectedDate.isBetween(weekStartDate, weekEndDate)) {
            const dayOfWeek = selectedDate.day();
            const selectedDayOnWeek = weekStartDate && weekStartDate.clone();

            if (selectedDayOnWeek) {
                selectedDayOnWeek.day(dayOfWeek);
                this.onDateSelected(selectedDayOnWeek);
            }
        }
        const _weekStartDate = weekStartDate && weekStartDate.clone();
        const _weekEndDate = weekEndDate && weekEndDate.clone();
        this.props.onWeekChanged && this.props.onWeekChanged(_weekStartDate, _weekEndDate);
    }

    renderDay = (props) => {
        return (
            <WeekDay {...props} />
        );
    }

    createDayProps = selectedDate => {
        return {
            selectedDate,
            onDateSelected: this.onDateSelected,
            contentSize: this.state.dayComponentWidth,
        }
    }

    goToday = () => {
        const { today, initialScrollerIndex } = this.state;

        this.scroller.scrollToIndex(initialScrollerIndex);
        this.onDateSelected(today);
    }

    render() {
        return (
            <View style={this.props.style}>
                <View
                    style={[{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }]}
                    onLayout={this.onLayout}>
                    {
                        this.state.dateList.length > 0 ?
                            <Scroller
                                ref={scroller => this.scroller = scroller}
                                data={this.state.dateList}
                                size={this.state.dayComponentWidth}
                                initialRenderIndex={this.state.initialScrollerIndex}
                                pagingEnabled={true}
                                firstDayOfWeek={this.props.firstDayOfWeek}
                                numVisibleItems={this.props.numDaysInWeek}
                                renderDay={this.renderDay}
                                renderDayParams={{ ...this.createDayProps(this.state.selectedDate) }}
                                onWeekChanged={this.onWeekChanged}
                            /> : <Text>teste menor 0</Text>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    calendarDates: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});
