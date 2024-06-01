import { useEffect, useState } from 'react'
import Filters from '../Filters'
import DataTable from '../DataTable/DataTable'
import tableData from '../../data/Kaptive_data.json'
import styles from './FinancialSummary.module.scss'
import { CurrencyEnum } from '../../enums/currency.enum'

export default function FinancialSummaryTable() {
    const [currency, setCurrency] = useState<CurrencyEnum>(CurrencyEnum.USD)
    const [decimal, setDecimal] = useState(0)
    const [data, setData] = useState(tableData.Sheet1)
    const rowsPerPage = 10;

    useEffect(() => {
        switch (currency) {
            case CurrencyEnum.USD:
                // In current usd data to USD price
                setData(() => tableData.Sheet1.map((row) => {
                    return {
                        ...row,
                        Jan: row.Jan,
                        Feb: row.Feb,
                        March: row.March,
                        April: row.April,
                        May: row.May,
                        June: row.June,
                        July: row.July,
                        August: row.August,
                        September: row.September,
                        October: row.October,
                        November: row.November,
                        December: row.December,
                    }
                })
                )
                break
            
            case CurrencyEnum.EUR:
                // In current usd data to EUR price
                setData(() => tableData.Sheet1.map((row) => {
                    return {
                        ...row,
                        Jan: row.Jan * 0.85,
                        Feb: row.Feb * 0.85,
                        March: row.March * 0.85,
                        April: row.April * 0.85,
                        May: row.May * 0.85,
                        June: row.June * 0.85,
                        July: row.July * 0.85,
                        August: row.August * 0.85,
                        September: row.September * 0.85,
                        October: row.October * 0.85,
                        November: row.November * 0.85,
                        December: row.December * 0.85,
                    }
                })
                )
                break
            case CurrencyEnum.GBP:
                // In current usd data to GBP price
                setData(() => tableData.Sheet1.map((row) => {
                    return {
                        ...row,
                        Jan: row.Jan * 0.73,
                        Feb: row.Feb * 0.73,
                        March: row.March * 0.73,
                        April: row.April * 0.73,
                        May: row.May * 0.73,
                        June: row.June * 0.73,
                        July: row.July * 0.73,
                        August: row.August * 0.73,
                        September: row.September * 0.73,
                        October: row.October * 0.73,
                        November: row.November * 0.73,
                        December: row.December * 0.73,
                    }
                })
                )
                break
        }
    }, [currency])

    return (
        <div className={styles.table_wrapper}>
            
            <Filters
                currency={currency}
                setCurrency={setCurrency}
                decimal={decimal}
                setDecimal={setDecimal}
            />
            <DataTable
                currency={currency}
                decimal={decimal}
                data={data}
                rowsPerPage={rowsPerPage}
            />
        </div>
    )
}
