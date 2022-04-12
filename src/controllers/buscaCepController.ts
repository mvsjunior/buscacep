import {Request, Response} from 'express';
import * as CepModel from '../models/Cep';

type cepQueryResult = {
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    ibge: string,
    gia: string,
    ddd: string,
    siafi: string,
    queryStatus: boolean
}
const validaCep = (cep: string): boolean => {

    if(cep?.length == 8 && parseInt(cep)){
        return true;
    }else {
        return false;
    }

}


export const buscaCep = async (req: Request, res: Response) => {

    let address: object;

    let cep: string | undefined;
    let cepQueryStatus: boolean;
    
    if(typeof(req.query.cep) == "string"){
        cep = req.query.cep;

    }else{
        cep = "";
    }

    if(validaCep(cep)){

        address = await CepModel.getAddress(cep);
        cepQueryStatus = true;

    }else{

        address = {erro: true};
        cepQueryStatus = false;
    }

    console.log(address);

    res.render('buscaCep', {cep, address, cepQueryStatus});
}


export const homeCep = async (req: Request, res: Response) => {

    res.render('buscaCep');
}