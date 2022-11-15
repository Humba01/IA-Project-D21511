/**
 * Integrantes do Grupo:
 *
 * \ Humberto Pereira Bravo - 2122130012
 * \ Aaron Willian Araujo Rodrigues - 2122130037
 * \ Rafael da Rocha Henrard - 1812082028
 * \ Manoel Matheus - 2122130045
 *
 */

import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';

// tipo de dados Economico
type Economico = {
  id: Number,
  renda: Number,
  idade: Number,
  emprestimo: Number,
  saida: Number
};

(() => {
  // montando constantes de montagem de parse
  const csvResolve = path.resolve(__dirname, './base-dados.csv');
  const headers = ['id', 'renda', 'idade', 'emprestimo', 'saida'];
  const fileContent = fs.readFileSync(csvResolve, { encoding: 'utf-8'} );

  // realizando parse csv
  parse(fileContent, {
    delimiter: ',',
    columns: headers,
  }, (error, result: Economico[]) => {

    if (error) {
      console.error(error);
    }

    // console.log("Result [Não Normalizado]: ", result);
    
    // contantes de análise inicial
    const idadeNecessaria = 18;
    let dadosNormalizados: Economico[] = [];
    
    // varendo todo o conteúdo de dados
    for(let i = 0; i < result.length; i++) {
    
      if(result[i].idade >= idadeNecessaria) {
        dadosNormalizados.push(result[i]);
      }

    }

    // console.log("Result [Normalizado]: ", dadosNormalizados);

    let saidaEmprestimo: Economico[] = [];
    let saidaEmprestimoNeg: Economico[] = [];

    // árvore de decisão - Entropia(S)
    for(let i = 0; i < dadosNormalizados.length; i++) {

      if(dadosNormalizados[i].saida == 1) {
        saidaEmprestimo.push(dadosNormalizados[i]);
      }

      if(dadosNormalizados[i].saida == 0) {
        saidaEmprestimoNeg.push(dadosNormalizados[i]);
      }

    }

    let entropiaGlobal = ((-1 * saidaEmprestimoNeg.length) / dadosNormalizados.length) * Math.log2((saidaEmprestimoNeg.length) / dadosNormalizados.length) - (saidaEmprestimo.length / dadosNormalizados.length) * Math.log2((saidaEmprestimo.length / dadosNormalizados.length));

    console.log(entropiaGlobal);

    // realizando entropias individuais de cada coluna
    let idadeJovemNormalizado: Economico[] = [], iJSaidas = { sim: 0, nao: 0 };
    let idadeMediaNormalizado: Economico[] = [], iMSaidas = { sim: 0, nao: 0 };
    let idadeSeniorNormalizado: Economico[] = [], iSSaidas = { sim: 0, nao: 0 };
    let rendaBaixaNormalizada: Economico[] = [], rBSaidas = { sim: 0, nao: 0 };
    let rendaMediaNormalizada: Economico[] = [], rMSaidas = { sim: 0, nao: 0 };
    let rendaAltaNormalizada: Economico[] = [], rASaidas = { sim: 0, nao: 0 };
    let emprestimoBaixoNormalizado: Economico[] = [], eBSaidas = { sim: 0, nao: 0 };
    let emprestimoMedioNormalizado: Economico[] = [], eMSaidas = { sim: 0, nao: 0 };
    let emprestimoAltoNormalizado: Economico[] = [], eASaidas = { sim: 0, nao: 0 };

      // cria vetores de cada categoria de idade, renda e emprestimo
    for(let k = 0; k < dadosNormalizados.length; k++) {

      if( dadosNormalizados[k].idade >= 18.00 && dadosNormalizados[k].idade <= 24.00 ) {
        idadeJovemNormalizado.push(dadosNormalizados[k]);
      }
      
      if( dadosNormalizados[k].idade >= 24.01 && dadosNormalizados[k].idade <= 45.00 ) { 
        idadeMediaNormalizado.push(dadosNormalizados[k]);
      }

      if( dadosNormalizados[k].idade >= 45.01 && dadosNormalizados[k].idade <= 80.00 ) { 
        idadeSeniorNormalizado.push(dadosNormalizados[k]);
      }


      if( dadosNormalizados[k].renda >= 10000.00 && dadosNormalizados[k].renda <= 20500.00 ) {
        rendaBaixaNormalizada.push(dadosNormalizados[k]);
      }

      if( dadosNormalizados[k].renda >= 20500.01 && dadosNormalizados[k].renda <= 45200.00 ) {
        rendaMediaNormalizada.push(dadosNormalizados[k]);
      }

      if( dadosNormalizados[k].renda >= 45200.01 && dadosNormalizados[k].renda <= 80000.00 ) {
        rendaAltaNormalizada.push(dadosNormalizados[k]);
      }

      
      if( dadosNormalizados[k].emprestimo >= 300.00 && dadosNormalizados[k].emprestimo <= 2500.00 ) {
        emprestimoBaixoNormalizado.push(dadosNormalizados[k]);
      }

      if( dadosNormalizados[k].emprestimo >= 2500.01 && dadosNormalizados[k].emprestimo <= 6200.00 ) {
        emprestimoMedioNormalizado.push(dadosNormalizados[k]);
      }

      if( dadosNormalizados[k].emprestimo >= 6200.01 && dadosNormalizados[k].emprestimo <= 20000.00 ) {
        emprestimoAltoNormalizado.push(dadosNormalizados[k]);
      }
    }

      // analisa e conta a quantidade de saídas "1" ou "0" dentro de cada vetor de idade, renda e emprestimo
    for(let w = 0; w < idadeJovemNormalizado.length; w++) {
      if(idadeJovemNormalizado[w].saida == 1) iJSaidas.sim++;
      if(idadeJovemNormalizado[w].saida == 0) iJSaidas.nao++;
    }

    for(let w = 0; w < idadeMediaNormalizado.length; w++) {
      if(idadeMediaNormalizado[w].saida == 1) iMSaidas.sim++;
      if(idadeMediaNormalizado[w].saida == 0) iMSaidas.nao++;
    }
    
    for(let w = 0; w < idadeSeniorNormalizado.length; w++) {
      if(idadeSeniorNormalizado[w].saida == 1) iSSaidas.sim++;
      if(idadeSeniorNormalizado[w].saida == 0) iSSaidas.nao++;
    }
    

    for(let w = 0; w < rendaBaixaNormalizada.length; w++) {
      if(rendaBaixaNormalizada[w].saida == 1) rBSaidas.sim++;
      if(rendaBaixaNormalizada[w].saida == 0) rBSaidas.nao++;
    }

    for(let w = 0; w < rendaMediaNormalizada.length; w++) {
      if(rendaMediaNormalizada[w].saida == 1) rMSaidas.sim++;
      if(rendaMediaNormalizada[w].saida == 0) rMSaidas.nao++;
    }

    for(let w = 0; w < rendaAltaNormalizada.length; w++) {
      if(rendaAltaNormalizada[w].saida == 1) rASaidas.sim++;
      if(rendaAltaNormalizada[w].saida == 0) rASaidas.nao++;
    }


    for(let w = 0; w < emprestimoBaixoNormalizado.length; w++) {
      if(emprestimoBaixoNormalizado[w].saida == 1) eBSaidas.sim++;
      if(emprestimoBaixoNormalizado[w].saida == 0) eBSaidas.nao++;
    }

    for(let w = 0; w < emprestimoMedioNormalizado.length; w++) {
      if(emprestimoMedioNormalizado[w].saida == 1) eMSaidas.sim++;
      if(emprestimoMedioNormalizado[w].saida == 0) eMSaidas.nao++;
    }
    
    for(let w = 0; w < emprestimoAltoNormalizado.length; w++) {
      if(emprestimoAltoNormalizado[w].saida == 1) eASaidas.sim++;
      if(emprestimoAltoNormalizado[w].saida == 0) eASaidas.nao++;
    }

    // calculo da entropia de "idade"
    let entropiaIdadeJovem = ((-1 * iJSaidas.nao) / idadeJovemNormalizado.length) * Math.log2(iJSaidas.nao / idadeJovemNormalizado.length) - ((iJSaidas.sim / idadeJovemNormalizado.length) * Math.log2(iJSaidas.sim / idadeJovemNormalizado.length));
    let entropiaIdadeMedia = ((-1 * iMSaidas.nao) / idadeMediaNormalizado.length) * Math.log2(iMSaidas.nao / idadeMediaNormalizado.length) - ((iMSaidas.sim / idadeMediaNormalizado.length) * Math.log2(iMSaidas.sim / idadeMediaNormalizado.length));
    let entropiaIdadeSenior = ((-1 * iSSaidas.nao) / idadeSeniorNormalizado.length) * Math.log2(iSSaidas.nao / idadeSeniorNormalizado.length) - ((iSSaidas.sim / idadeSeniorNormalizado.length) * Math.log2(iSSaidas.sim / idadeSeniorNormalizado.length));

    // calculo da entropia de "renda"
    let entropiaRendaBaixa = ((-1 * rBSaidas.nao) / rendaBaixaNormalizada.length) * Math.log2(rBSaidas.nao / rendaBaixaNormalizada.length) - ((rBSaidas.sim / rendaBaixaNormalizada.length) * Math.log2(rBSaidas.sim / rendaBaixaNormalizada.length));
    let entropiaRendaMedia = ((-1 * rMSaidas.nao) / rendaMediaNormalizada.length) * Math.log2(rMSaidas.nao / rendaMediaNormalizada.length) - ((rMSaidas.sim / rendaMediaNormalizada.length) * Math.log2(rMSaidas.sim / rendaMediaNormalizada.length));
    let entropiaRendaAlta = ((-1 * rASaidas.nao) / rendaAltaNormalizada.length) * Math.log2(rASaidas.nao / rendaAltaNormalizada.length) - ((rASaidas.sim / rendaAltaNormalizada.length) * Math.log2(rASaidas.sim / rendaAltaNormalizada.length));

    // calculo de entropia de "emprestimo"
    let entropiaEmprestimoBaixo = ((-1 * eBSaidas.nao) / emprestimoBaixoNormalizado.length) * Math.log2(eBSaidas.nao / emprestimoBaixoNormalizado.length) - ((eBSaidas.sim / emprestimoBaixoNormalizado.length) * Math.log2(eBSaidas.sim / emprestimoBaixoNormalizado.length));
    let entropiaEmprestimoMedio = ((-1 * eMSaidas.nao) / emprestimoMedioNormalizado.length) * Math.log2(eMSaidas.nao / emprestimoMedioNormalizado.length) - ((eMSaidas.sim / emprestimoMedioNormalizado.length) * Math.log2(eMSaidas.sim / emprestimoMedioNormalizado.length));
    let entropiaEmprestimoAlto = ((-1 * eASaidas.nao) / emprestimoAltoNormalizado.length) * Math.log2(eASaidas.nao / emprestimoAltoNormalizado.length) - ((eASaidas.sim / emprestimoAltoNormalizado.length) * Math.log2(eASaidas.sim / emprestimoAltoNormalizado.length));

    if(Number.isNaN(entropiaIdadeJovem)) entropiaIdadeJovem = 0;
    if(Number.isNaN(entropiaIdadeMedia)) entropiaIdadeMedia = 0;
    if(Number.isNaN(entropiaIdadeSenior)) entropiaIdadeSenior = 0;
    if(Number.isNaN(entropiaRendaBaixa)) entropiaRendaBaixa = 0;
    if(Number.isNaN(entropiaRendaMedia)) entropiaRendaMedia = 0;
    if(Number.isNaN(entropiaRendaAlta)) entropiaRendaAlta = 0;
    if(Number.isNaN(entropiaEmprestimoBaixo)) entropiaEmprestimoBaixo = 0;
    if(Number.isNaN(entropiaEmprestimoMedio)) entropiaEmprestimoMedio = 0;
    if(Number.isNaN(entropiaEmprestimoAlto)) entropiaEmprestimoAlto = 0;

    // calculo de entropia geral + "idade"
    let ganhoInfoGeralIdade = entropiaGlobal - (idadeJovemNormalizado.length / dadosNormalizados.length) * entropiaIdadeJovem - (idadeMediaNormalizado.length / dadosNormalizados.length) * entropiaIdadeMedia - (idadeSeniorNormalizado.length / dadosNormalizados.length) * entropiaIdadeSenior;

    // calculo de entropia geral + "renda" 
    let ganhoInfoGeralRenda = entropiaGlobal - (rendaBaixaNormalizada.length / dadosNormalizados.length) * entropiaRendaBaixa - (rendaMediaNormalizada.length / dadosNormalizados.length) * entropiaRendaMedia - (rendaAltaNormalizada.length / dadosNormalizados.length) * entropiaRendaAlta;

    // calculo de entropia geral + "emprestimo"
    let ganhoInfoGeralEmprestimo = entropiaGlobal - (emprestimoBaixoNormalizado.length / dadosNormalizados.length) * entropiaEmprestimoBaixo - (emprestimoMedioNormalizado.length / dadosNormalizados.length) * entropiaEmprestimoMedio - (emprestimoAltoNormalizado.length / dadosNormalizados.length) * entropiaEmprestimoAlto;

    let melhorGanhoDeInformacao = 0;

    if(ganhoInfoGeralIdade > ganhoInfoGeralRenda || ganhoInfoGeralIdade > ganhoInfoGeralEmprestimo) {
      melhorGanhoDeInformacao = ganhoInfoGeralIdade;
    }

    if(ganhoInfoGeralRenda > ganhoInfoGeralIdade || ganhoInfoGeralRenda > ganhoInfoGeralEmprestimo) {
      melhorGanhoDeInformacao = ganhoInfoGeralRenda;
    }
    
    if(ganhoInfoGeralEmprestimo > ganhoInfoGeralIdade || ganhoInfoGeralEmprestimo > ganhoInfoGeralRenda) {
      melhorGanhoDeInformacao = ganhoInfoGeralEmprestimo;
    }

    console.log(melhorGanhoDeInformacao);

  });
  
})();
