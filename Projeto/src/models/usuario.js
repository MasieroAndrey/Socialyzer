
class Usuario {
    constructor(idusuario,nome,senha,dataNascimento,sexo,cpf,descricao,listInteresse,notausuario, email, condicao ) {
        this.Idusuario = idusuario
        this.Nome = nome
        this.Senha = senha
        this.Email = email
        this.DataNascimento = dataNascimento
        this.Sexo = sexo
        this.Cpf = cpf
        this.Descricao = descricao
        this.NotaUsuario = notausuario
        this.ListaInteresse = listInteresse
        this.Condicao = condicao
    }

}
module.exports = Usuario;



