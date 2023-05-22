import React, { useEffect, useState } from 'react'
import { Container, Title } from './styles'
import { API } from '../../lib/axios'
import { Result } from '../Result'
import { handleKeyDown } from '../../utils/keydown'

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

  async function handlerSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const response = await API.post('/', { value: number })
      setResult(response.data)
    } catch (error) {
      console.error('Erro:', error)
    }

    setNumber('')
  }

  useEffect(() => {
    setDisabled(!number)
  }, [number])

  return (
    <Container>
      <Title>Calculadora Holu</Title>
      <form onSubmit={handlerSubmit}>
        <input
          type="number"
          placeholder="Insira a potência total"
          step="any"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          onKeyDown={handleKeyDown}
          required
        />

        <button type="submit" disabled={disabled}>
          Enviar
        </button>
      </form>
      {result && <Result result={result} />}
    </Container>
  )
}
