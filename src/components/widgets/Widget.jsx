import React from 'react'
import "./widget.scss"
import EstimateIcon from '../../Assets/estimate-icon.svg';
import CustomerIcon from '../../Assets/customer.svg';
import TeamIcon from  '../../Assets/team.svg';
import InvoiceIcon from '../../Assets/invoice.svg'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

const widget = ({type}) => {
    let data;

    switch (type) {
        case "estimates":
            data = {
                title: "Estimates",
                iconTitle: EstimateIcon,
                cardNum: "297",
                isMoney: false,
            };
            break;
            case "customers":
            data = {
                title: "Customers",
                iconTitle: CustomerIcon,
                cardNum: "20",
                isMoney: false,

            };
            break;
            case "team":
            data = {
                title: "Team Members",
                iconTitle: TeamIcon,
                cardNum: "9",
                isMoney: false,
            };
            break;
            case "invoice":
            data = {
                title: "Invoice Total",
                iconTitle: InvoiceIcon,
                cardNum: "8378",
                isMoney: true,
            };
            break;
            case "pendings":
            data = {
                title: "Pendings",
                iconTitle: InvoiceIcon,
                cardNum: "177",
                isMoney: false,
            };
            break;
            case "approved":
            data = {
                title: "Approved",
                iconTitle: InvoiceIcon,
                cardNum: "0",
                isMoney: false,
            };
            break;
            case "voided":
            data = {
                title: "Voided",
                iconTitle: InvoiceIcon,
                cardNum: "112",
                isMoney: false,
            };
            break;
            case "invoice":
            data = {
                title: "Invoice Total",
                iconTitle: InvoiceIcon,
                cardNum: "8378",
                isMoney: true,
            };
            break;
            default:
                break;

    }

  return (
    <div className='widget'>
        <div className='left'>
            <div className="estimate-card">
              <img  src={data.iconTitle} alt="" />
              <span>{data.title}</span>
         </div>
         <div className='card-num'>{data.isMoney && "$"} {data.cardNum}</div>
    </div>
        <div className='right'>
            <div className="percentage positive">
                <ArrowUpwardRoundedIcon/>40%</div>vs last month
        </div>
    </div>
  )
}

export default widget