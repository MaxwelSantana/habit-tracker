import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Calendar from '../components/Calendar';
import {
    CheckCircle,
    List,
    User,
    Plus,
    ArrowUpCircle,
    ArrowUp,
} from 'react-feather';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 81px);
    overflow: hidden;
`;

const ScrollContainer = styled.div`
    flex: 1;
    overflow-y: auto;
`;

export const DashboardCard = styled.div`
    height: 7rem;
    background: var(--dashboard-card);
    margin: 1rem;
    border-radius: 10px;
`;

const TasksTitle = styled.h1`
    font-size: 2rem;
    margin-left: 1rem;
`;

const TaskList = styled.ul`
    list-style: none;
    padding: 0 1rem;
`;
const TaskItem = styled.li`
    display: flex;
    align-items: center;
    padding: 1rem;
    background: var(--surface);
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
`;

const TaskCompleteButton = styled.button`
    background: none;
    border: 1px solid black;
    border-radius: 50%;
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.5rem;
`;

const BottomNav = styled.nav`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: var(--border);
`;
const NavList = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 1rem 0;
    background: var(--surface);
    margin: 0;
    text-align: center;
`;
const NavItem = styled.li`
    line-height: 0;
    height: 3rem;
    display: flex;

    svg {
        margin: auto;
    }

    &.selected {
        position: relative;
        z-index: 1;
        color: var(--selected-navitem);
    }

    &.selected::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        margin: auto;
        height: 3rem;
        width: 3rem;
        background: var(--selected-navitem-background);
        border-radius: 50%;
    }
`;

const QuickAddTaskForm = styled.form`
    margin: 0.5rem 1rem;
    display: flex;
    align-items: center;
    position: relative;
    --input-padding: 1rem;
    --icon-size: 1.25rem;
    --icon-padding: 0.5rem;
    --input-icon-offset: calc(
        var(--icon-size) + ((var(--icon-padding) + var(--input-padding)) * 2)
    );

    input {
        width: 100%;
        font-size: 1rem;

        padding: var(--input-padding);
        padding-right: var(--input-icon-offset);
        border-radius: var(--border-radius);
        border: none;
        border: thin solid;
    }

    input:focus ~ .send-button,
    input:not(:placeholder-shown) ~ .send-button {
        background: var(--primary);
        border: thin solid var(--primary);
        color: var(--icon);
    }

    .send-button {
        position: absolute;
        right: var(--input-padding);
        display: grid;
        place-items: center;
        border-radius: 50%;

        color: var(--icon-disabled);
        border: thin solid var(--icon-disabled);

        transition: background 0.2s ease-in-out;
    }

    svg {
        height: var(--icon-size);
        width: var(--icon-size);
        padding: var(--icon-padding);
    }
`;

export default function Home() {
    const newTaskRef = useRef('');
    const [tasks, setTasks] = useState([
        {
            id: 1,
            name: 'Clean The House',
        },
        {
            id: 2,
            name: 'Do Homework',
        },
        {
            id: 3,
            name: 'Finish Frontend Project',
        },
        {
            id: 4,
            name: 'Finish Frontend Project',
        },
        {
            id: 5,
            name: 'Finish Frontend Project',
        },
        {
            id: 6,
            name: 'Finish Frontend Project',
        },
        {
            id: 7,
            name: 'Finish Frontend Project',
        },
        {
            id: 8,
            name: 'Finish Frontend Project',
        },
        {
            id: 9,
            name: 'Finish Frontend Project',
        },
        {
            id: 10,
            name: 'Finish Frontend Project',
        },
    ]);

    function handleQuickAddTaskForm(event) {
        event.preventDefault();

        setTasks([
            { id: tasks.length + 1, name: newTaskRef.current.value },
            ...tasks,
        ]);
    }
    return (
        <>
            <Container>
                <Calendar />
                <ScrollContainer>
                    <DashboardCard />
                    <TasksTitle>Tasks</TasksTitle>
                    <TaskList>
                        {tasks.map((task) => (
                            <TaskItem key={task.id}>
                                <TaskCompleteButton />
                                {task.name}
                            </TaskItem>
                        ))}
                    </TaskList>
                </ScrollContainer>
                <QuickAddTaskForm onSubmit={handleQuickAddTaskForm}>
                    <input
                        type="text"
                        id="addTaskInput"
                        placeholder="Add a Task"
                        aria-label="Add a Task"
                        ref={newTaskRef}
                    />
                    <button className="send-button" type="submit">
                        <ArrowUp />
                    </button>
                </QuickAddTaskForm>
            </Container>
            <BottomNav>
                <NavList>
                    <NavItem className="selected">
                        <CheckCircle size="1.5rem" />
                    </NavItem>
                    <NavItem>
                        <List size="1.5rem" />
                    </NavItem>
                    <NavItem>
                        <User size="1.5rem" />
                    </NavItem>
                </NavList>
            </BottomNav>
        </>
    );
}
