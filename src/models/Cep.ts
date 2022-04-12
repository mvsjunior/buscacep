import axios, { AxiosResponse } from 'axios';


export const getAddress = (cep: string) => {
    return getAddressData(cep);
};

const getAddressData = async (cep: string) => {

    let result: AxiosResponse = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    let endereco = result.data;

    return endereco;

}