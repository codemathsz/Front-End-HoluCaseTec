import { useEffect, useState, ChangeEvent } from 'react'
import { Container, HeaderConatiner, NavHeader, Title } from './styles'
import { Result } from '../Result'
import { handleKeyDown } from '../../../../utils/keydown'
import { collection, addDoc, getFirestore } from 'firebase/firestore'
import { app } from '../../../../config/firebase'
import { ArrowLeft, Scroll } from 'phosphor-react'
import { History } from '../History'

interface ResultProps {
  amountPlates: number
  inverters: number
  potential: number
  lengthOfStructure: number
  usefulArea: number
  structureType: string
}

export function Form() {
  const [number, setNumber] = useState('')
  const [result, setResult] = useState<ResultProps>()
  const [disabled, setDisabled] = useState(true)
  const [presentForm, setPresentForm] = useState(true)
  const db = getFirestore(app)

  function calcular(number: any) {
    const structureType = 'Laje'
    const potential = 550 // watts
    const dimensions = { length: 1.95, width: 1.1 }

    const totalPotentialWatts = number * 1000 // convertendo
    const amountPlates = Math.round(totalPotentialWatts / potential)
    const inverters = Math.round(amountPlates / 4) // 1 inversor par 4 placas

    // mutiplicando e depois dividindo por 100 para ficar com duas casas decimais
    const lengthOfStructure =
      Math.round(amountPlates * dimensions.length * 100) / 100
    const usefulArea =
      Math.round(amountPlates * (dimensions.length * dimensions.width) * 100) /
      100

    return {
      amountPlates,
      inverters,
      potential,
      lengthOfStructure,
      usefulArea,
      structureType,
    }
  }

  async function handlerSubmit() {
    console.log(result)

    try {
      const docRef = await addDoc(collection(db, 'calculo'), {
        inverters: result?.inverters,
        amountPlates: result?.amountPlates,
        potential: result?.potential,
        lengthOfStructure: result?.lengthOfStructure,
        usefulArea: result?.usefulArea,
        structureType: result?.structureType,
      })

      console.log('Documento escrito  com ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }

    setNumber('')
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    if (value === '' || parseFloat(value) > 0) {
      setNumber(value)
    }
  }

  useEffect(() => {
    setDisabled(!number)
  }, [number])

  useEffect(() => {
    handlerSubmit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  return (
    <Container>
      <HeaderConatiner>
        {presentForm === true ? (
          <Title>Calculadora Holu</Title>
        ) : (
          <Title>Histórico</Title>
        )}
        <NavHeader>
          {presentForm === true ? (
            <a onClick={() => setPresentForm(false)} title="Histórico">
              <Scroll size={24} />
            </a>
          ) : (
            <a onClick={() => setPresentForm(true)} title="Voltar">
              <ArrowLeft size={24} />
            </a>
          )}
        </NavHeader>
      </HeaderConatiner>
      {presentForm === true ? (
        <form>
          <input
            type="number"
            placeholder="Insira a potência total"
            step="any"
            value={number}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            required
          />

          <button
            onClick={() => setResult(calcular(number))}
            type="button"
            disabled={disabled}
          >
            Enviar
          </button>
        </form>
      ) : (
        <History />
      )}
      {result && presentForm === true && <Result result={result} />}
    </Container>
  )
}
