import {
  collection,
  query,
  getDocs,
  getFirestore,
  DocumentData,
} from 'firebase/firestore'
import { app } from '../../../../config/firebase'
import { useEffect, useState } from 'react'
import { ContainerList, ListHistory, MessageEmpty } from './styles'
import { useNavigate } from 'react-router-dom'

interface DocProps {
  id: string
  amountPlates: number
  inverters: number
  potential: number
  lengthOfStructure: number
  usefulArea: number
  structureType: string
}

export function History() {
  const [calculos, setCalculos] = useState<DocProps[] | DocumentData[]>([])
  const db = getFirestore(app)
  const q = query(collection(db, 'calculo'))
  const navigate = useNavigate()

  async function fetchDocs() {
    const querySnapshot = await getDocs(q)
    const docs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setCalculos(docs)
  }

  useEffect(() => {
    fetchDocs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(calculos)
  return (
    <ContainerList>
      {calculos.length === 0 ? (
        <MessageEmpty>
          <p>Não tem nenhum calculo cadastrado!</p>
        </MessageEmpty>
      ) : (
        calculos.map((calc) => (
          <ListHistory
            key={calc.id}
            onClick={() => navigate(`/calculo/${calc.id}`)}
            title="Ver mais"
          >
            <li>ID: {calc.id}</li>
            <li>Structure Type: {calc.structureType}</li>
          </ListHistory>
        ))
      )}
    </ContainerList>
  )
}
