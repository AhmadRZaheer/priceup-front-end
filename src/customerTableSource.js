//temporary data
import userImg from "./Assets/username1.svg";
import "./components/table/table.scss"

export const userColumns = [
  {
    field:"id", 
    headerName: "ID",
    width: 70
  },
  { field: 'name', headerName: 'Customer Name', 
    width: 230, renderCell: (params)=> {
        return(
            <div className="cellWrapper">
        <div className="customerImg" >
          <img className="cellImg" src={params.row.img} alt="" />
        </div>
        <div className="customerNameTable">
          {params.row.name}
          <div className="userNameTable">{params.row.username}</div>
        </div>
      </div>

        )
        
        
    }
  },
  { field: 'Email', headerName: 'Email', width: 330 },
  {
    field: 'Address',
    headerName: 'Address',
    width: 120,
  },
  {
    field: 'LastQuote',
    headerName: 'Last Quoted On',
    width: 180,
  },

];

export const userRows = [
    {
      id: 1, 
      name: "Olivia Rhye",
      img: userImg ,
      username: "@olivia",
      Email: "olivia@untitleui.com",
      Address: "-",
      LastQuote: "Jan 4,2022",
    },
    {
        id: 2, 
        name: "Olivia Rhye",
        img: userImg ,
        username: "@olivia",
        Email: "olivia@untitleui.com",
        Address: "-",
        LastQuote: "Jan 4,2022",
      },
      {
        id: 3, 
        name: "Olivia Rhye",
        img: userImg ,
        username: "@olivia",
        Email: "olivia@untitleui.com",
        Address: "-",
        LastQuote: "Jan 4,2022",
      },
      {
        id: 4, 
        name: "Olivia Rhye",
        img: userImg ,
        username: "@olivia",
        Email: "olivia@untitleui.com",
        Address: "-",
        LastQuote: "Jan 4,2022",
      },
      {
        id:5,
        name: "Olivia Rhye",
        img: userImg ,
        username: "@olivia",
        Email: "olivia@untitleui.com",
        Address: "-",
        LastQuote: "Jan 4,2022",
      },
      {
        id:6,
        name: "Olivia Rhye",
        img: userImg ,
        username: "@olivia",
        Email: "olivia@untitleui.com",
        Address: "-",
        LastQuote: "Jan 4,2022",
      },
      {
        id:7,
        name: "Olivia Rhye",
        img: userImg ,
        username: "@olivia",
        Email: "olivia@untitleui.com",
        Address: "-",
        LastQuote: "Jan 4,2022",
      },
      {
        id:8,
        name: "Olivia Rhye",
        img: userImg ,
        username: "@olivia",
        Email: "olivia@untitleui.com",
        Address: "-",
        LastQuote: "Jan 4,2022",
      },
];