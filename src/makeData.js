import namor from 'namor'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

let donnees = [
  {"_numeroLigne":0,"_nomImage":"0","_idRLI":"-1","_idPorte":"564943d6-544d-4571-816f-4c543e9588ed-0010b5c4","_locNiveau":"RDC","_materiauSupport":"A-Beton","_epSupport":"18","_largeurPorte":"1000","_hauteurPorte":"2160","_epaisseurPorte":"0","_poussant":"DP"}
  ,{"_numeroLigne":1,"_nomImage":"0","_idRLI":"-1","_idPorte":"564943d6-544d-4571-816f-4c543e9588ed-0010b5c4","_locNiveau":"RDC","_materiauSupport":"A-Beton","_epSupport":"18","_largeurPorte":"1000","_hauteurPorte":"2160","_epaisseurPorte":"0","_poussant":"DP"}
  ,{"_numeroLigne":2,"_nomImage":"0","_idRLI":"-1","_idPorte":"564943d6-544d-4571-816f-4c543e9588ed-0010b5c4","_locNiveau":"RDC","_materiauSupport":"A-Beton","_epSupport":"18","_largeurPorte":"1000","_hauteurPorte":"2160","_epaisseurPorte":"0","_poussant":"DP"}
]

let compteur =-1;

const newPerson = () => {
  
  compteur++
  const statusChance = Math.random()
  let cles = Object.keys(donnees[compteur])
  return (donnees[compteur])
  
  
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
