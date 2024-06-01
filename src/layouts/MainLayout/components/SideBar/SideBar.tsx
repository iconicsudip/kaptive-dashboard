import { Link, useLocation } from 'react-router-dom';
import styles from './SideBar.module.scss'
import { TbTableFilled } from "react-icons/tb";
import UserInfo from '../../../../components/UserInfo';

const navItems = [
  {
    icon: <TbTableFilled />,
    name: 'Tables',
    path: '/',
  },
];


export default function SideBar() {
  const location = useLocation();

  return (
    <div className={styles.sidebar_wrapper}>
      <div className={styles.header}>
        <h3 className={styles.name}>PLSE</h3>
      </div>

      <div className={styles.navigations}>
        {navItems.map((item, index) => {
          return (
              <Link key={index} to={item.path} className={`${styles.nav_item} ${location.pathname === item.path ? styles.active : ''}`} >
            
              {item.icon}
              <div className={styles.name}>{item.name}</div>
              </Link>
          );
        })}
      </div>

      <div className={styles.footer}>
        <UserInfo />
      </div>
    </div>
  )
}
