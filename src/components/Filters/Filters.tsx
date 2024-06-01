import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, Typography} from "@mui/material";
import styles from './Filters.module.scss'
import { CurrencyEnum } from "../../enums/currency.enum";

const allCurrency = [
    {
        currency: 'USD',
        symbol: '$'
    },
    {
        currency: 'EUR',
        symbol: '€'
    },
    {
        currency: 'GBP',
        symbol: '£'
    }
]
const decimalValues = [
    {
        value: 0,
        label: '0th decimal'
    },
    {
        value: 1,
        label: '1st decimal'
    },
    {
        value: 2,
        label: '2nd decimal'
    },
]

interface Props {
    currency: CurrencyEnum,
    setCurrency: React.Dispatch<React.SetStateAction<CurrencyEnum>>,
    decimal: number,
    setDecimal: React.Dispatch<React.SetStateAction<number>>
}

export default function Filters({currency, setCurrency, decimal, setDecimal}:Props) {
    return (
        <div className={styles.filters_wrapper}>
            <FormControl sx={{ width: "300px" }}>
                <InputLabel id="demo-simple-select-label">Decimal Place</InputLabel>
                <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={decimal}
                    label="Decimal places"
                    onChange={(e) => {
                        setDecimal(e.target.value as number)
                    }}
                >
                    {decimalValues.map((decimalValue) => {
                        return (
                            <MenuItem key={decimalValue.value} value={decimalValue.value}>{decimalValue.label}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <FormControl sx={{ width: "300px" }}>
                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                <Select
                size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currency}
                    label="Currency"
                    onChange={(e) => {
                        setCurrency(e.target.value as CurrencyEnum)
                    }}
                >
                    {allCurrency.map((currency) => {
                        return (
                            <MenuItem key={currency.currency} value={currency.currency}>{currency.currency} ({currency.symbol})</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </div>
    )
}
