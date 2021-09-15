import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from '../components/Calendar';
import { CheckCircle, List, User } from 'react-feather';

const Container = styled.div``;

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

const QuickAddTask = styled.div``;

export default function Home() {
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
    ]);
    return (
        <Container>
            <Calendar />
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
            <QuickAddTask>
                <input type="text" />
            </QuickAddTask>
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
        </Container>
    );
}
