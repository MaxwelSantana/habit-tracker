import styled from 'styled-components';

export const Container = styled.div`
    text-align: center;
    background: var(--surface);
    padding: 1rem;
    border-bottom: var(--border);
`;
export const Month = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
`;
export const LabelDays = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 0.75rem;

    > span {
        font-size: 1.125rem;
    }
`;
export const VisibleDays = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    > span {
        font-size: 1.125rem;
        font-weight: 500;
    }

    > span.selected {
        color: var(--selected-day);
        position: relative;
        z-index: 1;
    }

    > span.selected::before {
        content: '';
        background-color: var(--selected-day-background);
        position: absolute;
        inset: 0;
        z-index: -1;
        border-radius: 0.75rem;
        width: 2.5rem;
        height: 2.5rem;
        margin: auto;
    }
`;
