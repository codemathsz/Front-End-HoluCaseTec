import { useParams, useNavigate } from 'react-router-dom'
import { app } from '../../config/firebase'
import { doc, getDoc, getFirestore, DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { CalcContainer, HeaderCalc } from './styles'
import { Note } from 'phosphor-react'

interface DocProps {
  amountPlates: number
  inverters: number
  potential: number
  lengthOfStructure: number
  usefulArea: number
  structureType: string
}

export function DetailsCalc() {
  const [docOfCalc, setDocOfCalc] = useState<DocProps | DocumentData>()
  const navigate = useNavigate()
  const { id } = useParams()
  const idParam = id ?? ''
  const db = getFirestore(app)

  async function getCalcByID() {
    const docRef = doc(db, 'calculo', idParam)
    const docSnap = await getDoc(docRef)
    setDocOfCalc(docSnap.data())
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
    } else {
      console.log('No such document!')
    }
  }

  useEffect(() => {
    getCalcByID()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <CalcContainer>
      <HeaderCalc>
        <h1>Resultado da Busca</h1>
        <nav>
          <a onClick={() => navigate(`/calculo`)} title="Formulário">
            <Note size={24} />
          </a>
        </nav>
      </HeaderCalc>
      <div>
        <p>amountPlates: {docOfCalc?.amountPlates}</p>
        <p>inverters: {docOfCalc?.inverters}</p>
        <p>lengthOfStructure: {docOfCalc?.lengthOfStructure}</p>
        <p>potential: {docOfCalc?.potential}</p>
        <p>structureType: {docOfCalc?.structureType}</p>
        <p>usefulArea: {docOfCalc?.usefulArea}</p>
      </div>
    </CalcContainer>
  )
}
