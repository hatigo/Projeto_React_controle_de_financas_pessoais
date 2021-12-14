import React from 'react';
import { useState } from 'react';
import seta from '../assets/seta-para-cima-confirm-delete.svg';
import lapis from '../assets/lapis.svg';
import lixeira from '../assets/lixo.svg';





function HistoricoFinanceiro(props) {



  const date = props.date.split('T')[0].split('-').reverse().join('/');
  

  let tipo = '';
  let sinal = 'R$';
  if (props.type === 'credit') {
    tipo = '#7B61FF';
    sinal ='';
  } else if (props.type === 'debit') {
    tipo = '#FA8C10';
    sinal = '-';

  }

  const valor = sinal + 'R$' + (props.valor / 100).toFixed(2);


  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);

  function handleshowModalConfirmDelete() {

    if (showModalConfirmDelete) {
      setShowModalConfirmDelete(false);
    } else {
      setShowModalConfirmDelete(true);
    }
  }





  return (
    <div onClick={() => { showModalConfirmDelete && setShowModalConfirmDelete(false) }} className='table-line'>
      <h1 className='line-items data'>{date}</h1>
      <h1 className='line-items diaDaSemana' >{props.diaDaSemana}</h1>
      <h1 className='line-items descricao' >{props.descricao}</h1>
      <h1 className='line-items categoria' >{props.categoria}</h1>
      <h1 className='line-items valor' style={{ color: tipo }} >{valor}</h1>
      <div className='container-icons-edit-delete'>
      <img onClick={props.cliqueParaEditar} className='edit-icon' src={lapis} alt='lapis' />
      <img onClick={handleshowModalConfirmDelete} className='delete-icon' src={lixeira} alt='lixeira' />
      {showModalConfirmDelete && (
        <div className='container-confirm-delete'>
          <img src={seta} alt='seta' className='seta-confirm-delete' />
          <h1>Apagar item?</h1>
          <button onClick={props.cliqueParaDeletar} className='btn-actions-confirm-delete sim'>Sim</button>
          <button onClick={handleshowModalConfirmDelete} className="btn-actions-confirm-delete nao">Não</button>
        </div>
      )}
      </div>
    </div>
  )
}


export default HistoricoFinanceiro;