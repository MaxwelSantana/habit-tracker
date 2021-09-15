import React from 'react';
import { Container, Month, LabelDays, VisibleDays } from './styles';

function Calendar() {
    return (
        <Container>
            <Month>September</Month>
            <LabelDays>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
                <span>Su</span>
            </LabelDays>
            <VisibleDays>
                <span>14</span>
                <span className="selected">15</span>
                <span>16</span>
                <span>17</span>
                <span>18</span>
                <span>19</span>
                <span>20</span>
            </VisibleDays>
        </Container>
    );
}

export default Calendar;
