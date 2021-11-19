import { Postagem } from './Postagem';

export class Tema {
  public idTema: number;
  public titulo: string;
  public data: Date;
  public criador: string;
  public postagens: Postagem[];
}
