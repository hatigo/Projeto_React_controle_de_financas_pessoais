import { useState, useEffect, createRef } from 'react';
import logo from './assets/logo.svg';
import funil from './assets/funil.svg';
import ModalFiltros from './components/modal-filtros';
import setaParaCima from './assets/seta-para-cima.svg';
import HistoricoFinanceiro from './components/historico-financeiro';
import ModalRegistro from './components/modal-registro';
import setaParaBaixo from './assets/seta-para-baixo.svg';






function App() {

  const [transactionData, setTransactionsData] = useState([]);


  useEffect(() => {
    loadTransactions();
  }, [])


  const loadTransactions = async () => {
    try {
      const response = await fetch('http://localhost:3333/transactions', {
        method: 'GET'
      })

      const data = await response.json();


      preencherResumo(data);
      separarCategorias(data);
      setTransactionsData(data);



    } catch (error) {
      console.log(error.message);
    }


  }

  const [ordenarPorData, setOrdenarPorData] = useState('decrescente');
  const [iconeSetaData, setIconeSetadata] = useState('');
  const [ordenarPorDiaDaSemana, setOrdenarPorDiaDaSemana] = useState('crescente');
  const [iconeSetaSemana, setIconeSetaSemana] = useState('');
  const [ordenarPorValor, setOrdenarPorValor] = useState('decrescente');
  const [iconeSetaValor, setIconeSetaValor] = useState('');

  const handleIconeSetaValor = () => {
    if (ordenarPorValor === 'crescente' || ordenarPorValor === 'decrescente') {
      setIconeSetaValor('');

    } else if (!ordenarPorValor) {
      setIconeSetaValor('none');
    }
  }


  const handleIconeSetaSemana = () => {
    if (ordenarPorDiaDaSemana === 'crescente' || ordenarPorDiaDaSemana === 'decrescente') {
      setIconeSetaSemana('');

    } else if (!ordenarPorDiaDaSemana) {
      setIconeSetaSemana('none');
    }
  }

  const handleIconeSetaData = () => {
    if (ordenarPorData === 'crescente' || ordenarPorData === 'decrescente') {
      setIconeSetadata('');

    } else if (!ordenarPorData) {
      setIconeSetadata('none');
    }
  }


  const diasDaSemanaParaOrdenacao = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

  const ordenacaoPorDiaDaSemana = () => {
    if (ordenarPorDiaDaSemana === 'crescente') {
      transactionData.sort((a, b) => diasDaSemanaParaOrdenacao.indexOf(a.week_day) - diasDaSemanaParaOrdenacao.indexOf(b.week_day));
    } else if (ordenarPorDiaDaSemana === 'decrescente') {
      transactionData.sort((a, b) => diasDaSemanaParaOrdenacao.indexOf(b.week_day) - diasDaSemanaParaOrdenacao.indexOf(a.week_day));

    }
    handleIconeSetaSemana();
  }

  const handleOrdenarPorDiaDaSemana = () => {

    if (ordenarPorDiaDaSemana === 'crescente') {
      setOrdenarPorDiaDaSemana('decrescente')
    } else if (ordenarPorDiaDaSemana === 'decrescente') {
      setOrdenarPorDiaDaSemana('crescente')

    }

    setIconeSetaValor('none')
    setIconeSetadata('none');
    ordenacaoPorDiaDaSemana();
  }




  const ordenacaoPorData = () => {
    if (ordenarPorData === 'crescente') {
      transactionData.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (ordenarPorData === 'decrescente') {
      transactionData.sort((a, b) => new Date(b.date) - new Date(a.date));

    }

    handleIconeSetaData();
  }

  const handleOrdenarPorData = () => {
    if (ordenarPorData === 'crescente') {
      setOrdenarPorData('decrescente')
    } else if (ordenarPorData === 'decrescente') {
      setOrdenarPorData('crescente')

    }

    setIconeSetaValor('none')
    setIconeSetaSemana('none');
    ordenacaoPorData();
  }


  const ordenacaoPorValor = () => {
    if (ordenarPorValor === 'crescente') {
      transactionData.sort((a, b) => a.value - b.value);
    } else if (ordenarPorValor === 'decrescente') {
      transactionData.sort((a, b) => b.value - a.value);

    }

    handleIconeSetaValor();
  }

  const handleOrdenarPorValor = () => {
    if (ordenarPorValor === 'crescente') {
      setOrdenarPorValor('decrescente')
    } else if (ordenarPorValor === 'decrescente') {
      setOrdenarPorValor('crescente')

    }

    setIconeSetadata('none');
    setIconeSetaSemana('none');
    ordenacaoPorValor();
  }




  const deletarRegistro = async (idParaDeletar) => {


    try {
      await fetch(`http://localhost:3333/transactions/${idParaDeletar}`, {
        method: 'DELETE'
      })

      await loadTransactions();

    } catch (error) {
      console.log(error.message);
    }



  }



  const [showFiltros, setShowFiltros] = useState(false);
  const [showModalRegistro, setShowModalRegristro] = useState(false);
  const [showModalEditarRegistro, setShowModalEditarRegristro] = useState(false);

  const handleshowModalRegistro = () => {
    if (showModalRegistro) {
      setFormDate();
      setFormDescription();
      setFormCategory();
      setFormValue();
      setEstadoBotaoTipo();
      setShowModalRegristro(false);
    } else {
      setShowFiltros(false);
      setShowModalRegristro(true);
    }
  }



  const handleShowFiltros = () => {
    if (showFiltros) {
      setShowFiltros(false);
    } else {
      setShowFiltros(true);
    }
  }



  const handleShowModalEditarRegristro = () => {
    if (showModalEditarRegistro) {
      setFormDate();
      setFormDescription();
      setFormCategory();
      setFormValue();
      setEstadoBotaoTipo();
      setShowModalEditarRegristro(false);
    } else {
      setShowFiltros(false);
      setShowModalEditarRegristro(true);
    }
  }



  const [formValue, setFormValue] = useState();
  const [formCategory, setFormCategory] = useState();
  const [formDescription, setFormDescription] = useState();
  const [formDate, setFormDate] = useState();
  const [estadoBotaoTipo, setEstadoBotaoTipo] = useState('debit');

  const handleEstadoBotaoTipo = () => {
    if (estadoBotaoTipo === 'credit') {
      setEstadoBotaoTipo('debit');
    } else {
      setEstadoBotaoTipo('credit');

    }
  }


  const [idParaEdicao, setIdParaEdicao] = useState();
  const consultarTransaction = async (idParaConsulta) => {
    try {
      const response = await fetch(`http://localhost:3333/transactions/${idParaConsulta}`, {
        method: 'GET'
      })

      const data = await response.json();

      const date = data.date.split('T')[0];


      setFormDate(date);
      setFormDescription(data.description);
      setFormCategory(data.category);
      setFormValue(data.value / 100);
      setEstadoBotaoTipo(data.type);
      setIdParaEdicao(idParaConsulta);
      handleShowModalEditarRegristro();




    } catch (error) {
      console.log(error.message);
    }

  }

  const editarRegistro = async () => {

    if (!formValue || formValue === '0') {
      return alert('Insira o valor');
    };
    if (!formCategory) {
      return alert('Insira a categoria');
    };
    if (!formDate) {
      return alert('Insira a data');
    };
    if (!formDescription) {
      return alert('Insira a descrição');
    };


    const dados = {
      date: new Date(formDate),
      week_day: diasDaSemana[dia],
      description: formDescription,
      value: (formValue * 100),
      category: formCategory,
      type: estadoBotaoTipo

    };
    try {
      const response = await fetch(`http://localhost:3333/transactions/${idParaEdicao}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),

      })

      handleShowModalEditarRegristro();
      loadTransactions();

    } catch (error) {
      console.log(error.message);
    }


  }




  const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
  const dia = new Date(formDate).getDay();

  const adicionarRegistro = async () => {

    if (!formValue || formValue === '0') {
      return alert('Insira o valor');
    };
    if (!formCategory) {
      return alert('Insira a categoria');
    };
    if (!formDate) {
      return alert('Insira a data');
    };
    if (!formDescription) {
      return alert('Insira a descrição');
    };


    const dados = {
      date: new Date(formDate),
      week_day: diasDaSemana[dia],
      description: formDescription,
      value: (formValue * 100),
      category: formCategory,
      type: estadoBotaoTipo
    };
    try {
      const response = await fetch('http://localhost:3333/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),

      })

      handleshowModalRegistro();
      loadTransactions();
    } catch (error) {
      console.log(error.message);
    }
  }


  const [entradas, setEntradas] = useState();
  const [saidas, setSaidas] = useState();
  const [saldo, setSaldo] = useState();


  const preencherResumo = (dados) => {
    let x = 0;
    const valorEntradas = dados.map((transacao) => {
      if (transacao.type === 'credit') {
        return x += Number(transacao.value);
      }
    }).sort((a, b) => b - a)[0];

    let y = 0;
    const valorSaidas = dados.map((transacao) => {
      if (transacao.type === 'debit') {
        return y += Number(transacao.value);
      }
    }).sort((a, b) => b - a)[0];


    const valorSaldo = (((valorEntradas ? valorEntradas : 0) - (valorSaidas ? valorSaidas : 0)) / 100).toFixed(2);

    setEntradas((valorEntradas ? (valorEntradas / 100).toFixed(2) : 0));
    setSaidas((valorSaidas ? (valorSaidas / 100).toFixed(2) : 0));
    setSaldo((valorSaldo));


  }

  const [categorias, setCategorias] = useState([]);

  const separarCategorias = (dados) => {
    const categorias = dados.map((transacao) => {
      return transacao.category;
    })

    const categoriasSemRepeticao = categorias.filter((x, y) => {
      return categorias.indexOf(x) === y;
    })

    setCategorias(categoriasSemRepeticao);

  }

  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();


  const filtrarRegistros =  (filtros) => {
    
    
    if (!minValue || !maxValue) {
      loadTransactions();
    }
    const indices = [];

    transactionData.map(dado => {
      if (dado.value < (minValue * 100) || dado.value > (maxValue * 100)) {
        indices.push(transactionData.indexOf(dado));
      }
    })


    indices.map(indice => {
      delete transactionData[indice];
    })




    preencherResumo(transactionData);


  }

  const limparFiltros = async () => {
    setMinValue('');
    setMaxValue('');

    await loadTransactions();
  }

  


  return (
    <div className="App">
      <div className="container-header">
        <img src={logo} alt='logo' />

      </div>
      <div className='container-body'>
        <button onClick={handleShowFiltros} className='open-filters-button borda'><img src={funil} alt='funil' />Filtrar</button>
        {showFiltros ? <ModalFiltros
          categorias={categorias}
          minValue={minValue}
          changeMinValue={e => { setMinValue(e.target.value) }}
          maxValue={maxValue}
          changeMaxValue={e => { setMaxValue(e.target.value) }}
          filtrarRegistros={filtrarRegistros}
          limparFiltros={limparFiltros}
          

        >
          
        </ModalFiltros>  : null}


        <div className='table'>
          <div className='table-head'>
            <div className='column-title borda'>
              <h1 onClick={handleOrdenarPorData} id='date'>Data <img style={{ display: iconeSetaData }} src={ordenarPorData === 'crescente' ? setaParaBaixo : setaParaCima} alt='seta Para Cima' /></h1>
              <h1 onClick={handleOrdenarPorDiaDaSemana} id='week-day'>Dia da semana<img style={{ display: iconeSetaSemana }} src={ordenarPorDiaDaSemana === 'crescente' ? setaParaBaixo : setaParaCima} alt='seta Para Cima' /></h1>
              <h1 className='descricao'>Descrição</h1>
              <h1 className='categoria'>Categoria</h1>
              <h1 onClick={handleOrdenarPorValor} id='value'>Valor<img style={{ display: iconeSetaValor }} src={ordenarPorValor === 'crescente' ? setaParaBaixo : setaParaCima} alt='seta Para Cima' /></h1>

            </div>


          </div>
          <div className='table-body'>
            {transactionData.map((transaction) => (
              <HistoricoFinanceiro key={transaction.id}
                id={transaction.id}
                date={transaction.date}
                diaDaSemana={transaction.week_day}
                descricao={transaction.description}
                categoria={transaction.category}
                valor={transaction.value}
                type={transaction.type}
                cliqueParaEditar={() => { consultarTransaction(transaction.id) }}
                cliqueParaDeletar={() => { deletarRegistro(transaction.id) }}

              />

            ))}


          </div>

        </div>

        <div className='container-resume borda'>

          <h1>Resumo</h1>
          <h2>Entradas<span className='in'>R${entradas}</span></h2>
          <h2>Saídas<span className='out'>R${saidas}</span></h2>
          <h2 className='saldo'>Saldo<span className='balance'>{saldo < 0 && '-'}R${saldo < 0 ? saldo * (-1) : saldo}</span></h2>

          <button onClick={handleshowModalRegistro} className='btn-add'>Adicionar Registro</button>
        </div>



      </div>
      {showModalRegistro ? <ModalRegistro
        cliqueModal={handleshowModalRegistro}
        changeValue={e => { setFormValue(e.target.value) }}
        value={formValue}
        changeCategoria={e => { setFormCategory(e.target.value) }}
        categoria={formCategory}
        changeData={e => { setFormDate(e.target.value) }}
        data={formDate}
        changeDescricao={e => { setFormDescription(e.target.value) }}
        descricao={formDescription}
        clicarEstadoBotao={handleEstadoBotaoTipo}
        estadoBotao={estadoBotaoTipo}
        cliqueActionRegistro={adicionarRegistro}
        actionRegistro='Adicionar Registro'
      /> : null}

      {showModalEditarRegistro ? <ModalRegistro
        cliqueModal={handleShowModalEditarRegristro}
        changeValue={e => { setFormValue(e.target.value) }}
        value={formValue}
        changeCategoria={e => { setFormCategory(e.target.value) }}
        categoria={formCategory}
        changeData={e => { setFormDate(e.target.value) }}
        data={formDate}
        changeDescricao={e => { setFormDescription(e.target.value) }}
        descricao={formDescription}
        clicarEstadoBotao={handleEstadoBotaoTipo}
        estadoBotao={estadoBotaoTipo}
        cliqueActionRegistro={editarRegistro}
        actionRegistro='Editar Registro'
      /> : null}

    </div>
  );


}

export default App;
