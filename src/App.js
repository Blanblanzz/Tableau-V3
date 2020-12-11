import React from 'react'
import styled from 'styled-components'
import { useTable, usePagination, useBlockLayout, useResizeColumns  } from 'react-table'
import logo1 from './logo1.png'

import makeData from './makeData'

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

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  return (
    <>
    
    {id==='_poussant' && <input className='img' type="image" src={logo1}   />}
    {id!=='_poussant' && <input value={value} onChange={onChange} onBlur={onBlur}  />} 
  
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
    getToggleHideAllColumnsProps,
    
    

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
 
  const click = () =>{
    if (document.getElementById("mask").style.display === "block")
        document.getElementById("mask").style = "display : none"
    else
    document.getElementById("mask").style = "display : block"
  }

  
 
  // Render the UI for your table
  return (
    <>
    <img src={logo1} alt="marche pas"/> 
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
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
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
            width : 75
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
            width : 81
          },
        ],
      },
    ],
    []
  )

  let donnees = [
    {"_numeroLigne":0,"_nomImage":"0","_idRLI":"-1","_idPorte":"564943d6-544d-4571-816f-4c543e9588ed-0010b5c4","_locNiveau":"RDC","_materiauSupport":"A-Beton","_epSupport":"18","_largeurPorte":"1000","_hauteurPorte":"2160","_epaisseurPorte":"0","_poussant":"DP"}
    ,{"_numeroLigne":1,"_nomImage":"0","_idRLI":"-1","_idPorte":"564943d6-544d-4571-816f-4c543e9588ed-0010b5c4","_locNiveau":"RDC","_materiauSupport":"A-Beton","_epSupport":"18","_largeurPorte":"1000","_hauteurPorte":"2160","_epaisseurPorte":"0","_poussant":"DP"}
    ,{"_numeroLigne":2,"_nomImage":"0","_idRLI":"-1","_idPorte":"564943d6-544d-4571-816f-4c543e9588ed-0010b5c4","_locNiveau":"RDC","_materiauSupport":"A-Beton","_epSupport":"18","_largeurPorte":"1000","_hauteurPorte":"2160","_epaisseurPorte":"0","_poussant":"DP"}
  ]

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

  return (
    <Styles>
      <button onClick={resetData}>Reset Data</button>
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
