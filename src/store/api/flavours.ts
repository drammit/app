import { get } from '../../core/fetch';

export const getAllFlavours = () => get('/flavour/list');
