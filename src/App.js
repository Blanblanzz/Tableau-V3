import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTable, usePagination, useBlockLayout, useResizeColumns  } from 'react-table'
import logo1 from './logo1.png'
import logo2 from './logo2.png'
import logo3 from './logo3.png'


const Styles = styled.div`
  padding: 1rem;
  #mask{
    display:none;
  }
  

  
  .table {
    display: inline-block;
    border-spacing: 0;
    

    .tr {
      
      :last-child {
        .td {
          border-bottom: solid black 1px;
         
        }
        
      }
      :nth-child(odd){
        background-color:#D9E1F2;
        input {
          background-color:#D9E1F2;
        }
      }
    }
    .th{
      background-color : #4472C4;
      color :white;
      border-bottom : solid black 1px;
      width : 10px;
      

    },
    .td{
     border : solid black 1px;
     
    }
    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;
      text-align: center;

      

      :last-child {
        border-right: 0;
      }
      input {
        font-size: 1rem;
        padding: 0 ;
        margin: 0;
        text-align: center;
        border: 0;
        ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
       position: relative;
       width : 100px;
       
       
      
       
      }
      .img {
        
          width :60px;
        
      }
      
      
    

      .resizer {
        display: inline-block;
        background: #4472C4;
        width: 0px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        border-right: 1px solid black;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        &.isResizing {
          background: red;
        }
      }

    }
    


  }
 
`


let passage = 0;
let compteur=0;

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  if (passage ==1) {
    compteur = 0
    passage = 0
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }
  
  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  let nomImg= [logo1,logo2,logo3];
  
  
  return (
    <>
    
  {/*   {id ==='_nomImage' && <><input className='img' type="image" src={nomImg[compteur] }    /> <code {...passage===0 && compteur++  }{...compteur===nomImg.length && passage++}/> </> } */}
     
    {id !=='_nomImage' && <input value={value} onChange={onChange} onBlur={onBlur}  />} 
     
  
  {/*  <input value={value} onChange={onChange} onBlur={onBlur}  /> */}
  </>
  )
}


// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
}
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return <input type="checkbox" ref={resolvedRef} {...rest} />
  }
)



// Be sure to pass our updateMyData and the skipPageReset option
function Table({ columns, data, updateMyData, skipPageReset }) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    allColumns,
    
    
    

    state: { pageIndex, pageSize },
    
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    usePagination,
    useBlockLayout,
    useResizeColumns
  )
  console.log(data);
  const click = () =>{
    if (document.getElementById("mask").style.display === "block")
        document.getElementById("mask").style = "display : none"
    else
    document.getElementById("mask").style = "display : block"
  }

  

 
  // Render the UI for your table
  return (
    <>
  
      <button onClick={click}>Afficher les checkboxes</button>
      <div id="mask">
        
        {allColumns.map(column => (
          <div key={column.id}> 
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.id}
            </label>

          </div>
        ))}
        <br />
      </div> 

   
      <div>
        <div {...getTableProps()} className="table"> 
          <div>
            {headerGroups.map(headerGroup => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map(column => (
                  <div {...column.getHeaderProps()} className="th">
                    {column.render('Header')}   
                    
                    {/*console.log(allColumns)*/}
                 {/*      <input type="checkbox" {...column.getToggleHiddenProps()} />{' '} */}
              
                     {column.render('Header')==='Id RLI' && column.toggleHidden(true)}
          
                      {/* Use column.getResizerProps to hook up the events correctly */}
                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${
                        column.isResizing ? 'isResizing' : ''
                        }`}
                      />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <div {...row.getRowProps()} className="tr">
                  {row.cells.map(cell => {
                    return (
                      <div {...cell.getCellProps()} className="td">
                        {cell.render('Cell')}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <pre>
     {/*   <code>{JSON.stringify(state.columnResizing.headerIdWidths, null,2)}</code> */}
        
       
       
      </pre>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}






function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    // Remarque : le tableau vide de dépendances [] indique
    // que useEffect ne s’exécutera qu’une fois, un peu comme
    // componentDidMount()
    useEffect(() => {
      fetch("http://localhost/ping-pong.php")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);

           
          },
          // Remarque : il faut gérer les erreurs ici plutôt que dans
          // un bloc catch() afin que nous n’avalions pas les exceptions
          // dues à de véritables bugs dans les composants.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
   

  const [columns,setColums] = React.useState(
     [
      {
        Header: 'Name',
        columns: [
            {
                Header: 'IDchantier',
                accessor: '_idChantier',
                width : 118
              },
          {
            Header: 'numero ligne',
            accessor: '_numeroLigne',
            width : 114,
          },
          {
            Header: 'nom image',
            accessor: '_nomImage',
            width : 106,

          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'niveau',
            accessor: '_locNiveau',
            width : 130
          },
          {
            Header: 'materiau support',
            accessor: '_materiauSupport',
            width : 139
          },
          {
            Header: 'Id RLI',
            accessor: '_idRLI',
            width : 150
          },
          {
            Header: 'Epaisseur support',
            accessor: '_epSupport',
            width : 150  
          },
          {
            Header: 'Largeur Porte',
            accessor: '_largeurPorte',
            width : 117
          },
          {
            Header: 'Hauteur porte',
            accessor: '_hauteurPorte',
            width : 118
          },
          {
            Header: 'Poussant',
            accessor: '_poussant',
            width : 118
          },
          
        ],
      },
    ],
    []
  )
 
    let donnees = items;
   
    let compteur =-1;

const newRow = () => {
  compteur++
  
  return (donnees[compteur]);
  
}

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

    const makeData = (...lens) =>{
        
      const makeDataLevel = (depth = 0) => {
        const len = lens[depth]
        return range(len).map(d => {
          return {
            ...newRow(),
            subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
          }
        })
      }
    
      return makeDataLevel()
    }

    
  const [data, setData] = React.useState(() => makeData(donnees.length)
   )
   
   
  const [originalData] = React.useState(data)
  const [skipPageReset, setSkipPageReset] = React.useState(false)
 
  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false)
  }, [data])

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData)

  const handleSubmit = (event)=>{
    event.preventDefault();
    //React.useMemo()
    if (newColonneInput!==""){
       const newColumns=columns
    newColumns[1].columns.push(createColonne(newColonneInput))

    
    
    
    setColums(newColumns.slice())
    setColonneInput("")
    
  
  }}
  const chargerDonnee = () => {
    setData(makeData(donnees.length))
  }

    
  const [newColonneInput,setColonneInput] = React.useState("")


  const handleChange = (event)=>{
    setColonneInput(event.currentTarget.value)
  }

  const createColonne = (arg) =>{
    //console.log(arg)
    return {
      Header: arg,
      accessor: arg,
      width : 150}
  }
  
  
  

  return (
    <Styles>
      <form onSubmit={handleSubmit}>
    <input value ={newColonneInput} onChange={handleChange} type="text" placeholder="ajouter une colonne"></input>
    <button >Confirmer</button>
  </form>
  <button onClick ={chargerDonnee}>Charger</button>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </Styles>
  )
}

export default App

{/*
class AppPHP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }

    onClick() { 
        fetch("http://localhost/ping-pong.php")
        
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }



    render() { 
        const { error, isLoaded, items } = this.state;
        return ( 
            <>
            <button onClick={this.onClick} >Test</button> 
            <code {...console.log(items)}/>
            </>
        ); 
    } 
} */}

    
 


