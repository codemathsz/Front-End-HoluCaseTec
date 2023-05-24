import { styled } from 'styled-components'

export const Container = styled.div`
  min-width: 40vw;
  margin: 0 auto;
  border-radius: 6px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${(props) => props.theme['gray-300']};
  padding: 1rem 2.5rem;
  text-align: center;

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input {
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 0.8rem;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }

  button[type='button'] {
    width: 50%;
    height: 4rem;
    border: 0;
    margin: 0 auto;
    border-radius: 6px;
    background: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme.white};
    font-weight: bold;
    padding: 0 1.25rem;
    margin-top: 1.5rem;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${(props) => props.theme['green-700']};
      transition: background-color 0.2s;
    }
  }

  @media screen and (min-width: 721px) {
    form {
      width: 40vw;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 720px) {
    form {
      width: 80vw;
      grid-template-columns: 1fr;
    }
  }

  @media screen and (max-width: 480px) {
    & {
      padding: 0.5rem;
    }
    form {
      width: 90vw;
    }
  }

  @media screen and (max-width: 320px) {
    form {
      width: 95vw;
    }
  }
`

export const Title = styled.p`
  color: ${(props) => props.theme['gray-800']};
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
`
