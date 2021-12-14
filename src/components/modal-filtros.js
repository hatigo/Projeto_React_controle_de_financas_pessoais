import React from 'react';
import { useState } from 'react';
import '../index.css';
import adicao from '../assets/adicao.svg';
import closeFiltro from '../assets/close-filtro.svg'


function BotaoFiltro(props) {

  const [estadoDoFiltro, setEstadoDoFiltro] = useState(false);
  const handleEstadoDoFiltro = () => {
    if (!estadoDoFiltro) {
      return setEstadoDoFiltro(true);
    } else if (estadoDoFiltro) {
      return setEstadoDoFiltro(false);
    }
  }

  let estiloDoFiltro = '';
  let corDaLetra = '';
  if (estadoDoFiltro) {
    estiloDoFiltro = '#7B61FF';
    corDaLetra = '#FFFFFF'
  } else if (!estadoDoFiltro) {
    estiloDoFiltro = '';
    corDaLetra = '';
  }



  return (
    <a onClick={handleEstadoDoFiltro} style={{ background: estiloDoFiltro, color: corDaLetra }} className='container-chip borda' > {props.children} <img className='icon-filter' src={estadoDoFiltro ? closeFiltro : adicao} /></a>

  )
}

function ModalFiltros(props) {



  const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']


  return (
    <div className='container-filters borda '>
      <div className='card-filters'>
        <h1>Dia da semana</h1>
        <ul>
          {diasDaSemana.map(dia => (
            <li>
              {props.children}
              <BotaoFiltro
                key={dia}

              >
                {dia}
              </BotaoFiltro>
            </li>
          ))}

        </ul>
      </div>
      <div className='card-filters'>
        <h1>categoria</h1>
        <ul>
          {props.categorias.map(categoria => (
            <li>
              <BotaoFiltro
                key={categoria}

              >
                {categoria}

              </BotaoFiltro>
            </li>
          ))}
        </ul>
      </div>
      <div className='card-filters'>
        <h1>Valor</h1>
        <label htmlFor='min-value'>Min</label>
        <input onChange={props.changeMinValue} value={props.minValue} type='number' id='min-value' />
        <label htmlFor='max-value'>Max</label>
        <input onChange={props.changeMaxValue} value={props.maxValue} type='number' id='max-value' />
        <div className='container-botoes-filtros'>
          <button onClick={props.limparFiltros} className='btn-clear-filters borda'>Limpar Filtros</button>
          <button onClick={props.filtrarRegistros} className='btn-apply-filters borda'>Aplicar Filtros</button>
        </div>
      </div>
    </div>

  )
}




export default ModalFiltros;


