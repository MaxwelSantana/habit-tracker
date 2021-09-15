import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from '../components/Calendar';

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
        </Container>
    );
}
