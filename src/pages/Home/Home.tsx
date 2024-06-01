import { Container } from '@mui/material';
import FinancialSummaryTable from '../../components/FinancialSummaryTable';
import styles from './Home.module.scss'

export default function Home() {
    return (
        <Container className={styles.home_wrapper}>
            <div className={styles.heading}>
                <h2>Cashflow Summary</h2>
                <p className={styles.desc}>
                    Cashflow summary is a summary of the cash inflows and outflows of a business.
                </p>
            </div>
            <FinancialSummaryTable />
        </Container>
    )
}