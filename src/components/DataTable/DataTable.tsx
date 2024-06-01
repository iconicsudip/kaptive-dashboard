import { TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table } from "@mui/material"
import { DragEvent, useEffect, useRef, useState } from "react";
import styles from './DataTable.module.scss'
import { formatNumberToIndian } from "../../utils/functions";

interface Props {
    currency: string,
    decimal: number,
    data: {
        Overhead: string;
        Jan: number;
        Feb: number;
        March: number;
        April: number;
        May: number;
        June: number;
        July: number;
        August: number;
        September: number;
        October: number;
        November: number;
        December: number;
    }[],
    rowsPerPage?: number
}

const ROW_HEIGHT = 50;

export default function DataTable({ currency, decimal, data, rowsPerPage }: Props) {
    const [formattedData, setFormattedData] = useState(data);
    const VISIBLE_ROW_COUNT = rowsPerPage ?? 10;
    const containerRef = useRef(null);
    const containerHeight = (VISIBLE_ROW_COUNT * ROW_HEIGHT) + ROW_HEIGHT - 5;
    const itemHeight = ROW_HEIGHT;
    const [scrollTop, setScrollTop] = useState(0);
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
        startIndex + Math.ceil(containerHeight / itemHeight),
        data.length
    );
    const visibleItems = formattedData.slice(startIndex, endIndex);
    const invisibleItemsHeight = (startIndex + visibleItems.length - endIndex) * itemHeight;
    const handleScroll = (event: any) => {
        setScrollTop(event.target.scrollTop);
    };
    const formatValue = (value: number) => {
        const priceFormat = formatNumberToIndian(value.toFixed(decimal));
        return `${priceFormat}`;
    };

    const handleDragStart = (event: DragEvent<HTMLTableCellElement>, index: number) => {
        const draggedIndex = startIndex + index;
        event.dataTransfer.setData('draggedIndex', draggedIndex.toString());
    };

    const handleDrop = (event: DragEvent<HTMLTableRowElement>, dropIndex: number) => {
        const draggedIndex = Number(event.dataTransfer.getData('draggedIndex'));
        if (isNaN(draggedIndex)) return;

        const adjustedDropIndex = startIndex + dropIndex;
        const newOrder = Array.from(formattedData);
        const [movedRow] = newOrder.splice(draggedIndex, 1);
        newOrder.splice(adjustedDropIndex, 0, movedRow);
        setFormattedData(newOrder);
    };

    const handleDragEnd = (event: DragEvent<HTMLTableRowElement>) => {
        const rowElement = event.currentTarget;
        rowElement.draggable = false;
        rowElement.classList.remove(styles.dragging);
    };

    useEffect(() => {
        setFormattedData(data);

    }, [data]);
    return (
        <TableContainer className={styles.table}
            style={{ height: `${containerHeight}px`, overflowY: "scroll" }}
            component={Paper} ref={containerRef}
            onScroll={handleScroll}>
            <Table
                style={{
                    borderCollapse: "unset"
                }}
                className={styles.printTable}
            >
                <TableHead
                    className={styles.table_head}
                >
                    <TableRow>
                        <TableCell className={styles.sticky_col}></TableCell>
                        <TableCell style={{ width: '400px' }} className={styles.sticky_col}>Cashflow</TableCell>
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                            <TableCell key={month}>{month}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody
                    style={{
                        position: "relative",
                        height: `${visibleItems.length * itemHeight}px`,
                        top: `${startIndex * itemHeight}px`,
                    }}
                >
                    {visibleItems.map((row, index) => (
                        <TableRow
                            key={index}
                            style={{ height: `${itemHeight}px` }}
                            onDrop={(event) => handleDrop(event, index)}
                            onDragOver={(event) => event.preventDefault()}
                            onDragEnd={handleDragEnd}
                        >
                            <TableCell draggable
                                style={{ cursor: "move" }}
                                onDragStart={(event) => handleDragStart(event, index)} className={styles.sticky_col}>::</TableCell>
                            <TableCell className={styles.sticky_col} style={{ width: "500px" }}>{row.Overhead}</TableCell>
                            {Object.keys(row).filter(key => key !== 'Overhead').map((key) => (
                                <TableCell key={key}>{formatValue(Number(row[key as keyof typeof row]))}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div style={{ height: `${invisibleItemsHeight}px` }} />
        </TableContainer>
    )
}
