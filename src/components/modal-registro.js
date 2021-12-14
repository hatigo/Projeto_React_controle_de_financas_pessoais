import React from "react";

import close from '../assets/close.svg'

function ModalRegistro(props) {



    let luzBotaoCredit = '';
    let luzBotaoDebit = '';
    if (props.estadoBotao === 'credit') {
        luzBotaoCredit = 'linear-gradient(91.26deg, #05EDE3 0%, #3A9FF1 97.77%)';
        luzBotaoDebit = '#B9B9B9';
    } else {
        luzBotaoCredit = '#B9B9B9';
        luzBotaoDebit = 'linear-gradient(91.66deg, #FA8C10 0%, #FF576B 90.32%)';
    }


    return (
        <div onClick={props.cliqueModal} className="modal-container">

            <div onClick={e => { e.stopPropagation() }} className='modal-container-body'>
                <div className="modal-header">
                    <h1>{props.actionRegistro}</h1>
                    <img onClick={props.cliqueModal} src={close} alt="" className="close-icon" />
                </div>
                <div className="modal-buttons">
                    <button onClick={props.clicarEstadoBotao} className="credit-button" style={{ background: luzBotaoCredit }}>Entrada</button>
                    <button onClick={props.clicarEstadoBotao} className="debit-button" style={{ background: luzBotaoDebit }} >Saída</button>
                </div>

                <label htmlFor="value">Valor</label>
                <input onChange={props.changeValue} value={props.value} type="number" name="value" required />
                <label htmlFor="category">Categoria</label>
                <input onChange={props.changeCategoria} value={props.categoria} type="text" name="category" required />
                <label htmlFor="date">Data</label>
                <input onChange={props.changeData} value={props.data} type="date" name="date" required />
                <label htmlFor="description">Descrição</label>
                <input onChange={props.changeDescricao} value={props.descricao} type="text" name="description" required />
                <button onClick={props.cliqueActionRegistro} className="btn-insert">Confirmar</button>

            </div>

        </div >
    )
}

export default ModalRegistro;