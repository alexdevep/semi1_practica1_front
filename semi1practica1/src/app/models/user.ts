export class User {

    constructor(id_='', username='', name='', password='', foto=''){
        this.id_ = id_;
        this.username = username;
        this.name = name;
        this.password = password;
        this.foto = foto;
    }

    id_: string;
    username: string;
    name: string;
    password: string;
    foto: string;
	//extension: string;
    //image: string;

}

export class User2 {

    constructor(id='', usuario='', nombre='', password='', foto=''){
        this.id = id;
        this.usuario = usuario;
        this.nombre = nombre;
        this.password = password;
        this.foto = foto;
    }

    id: string;
    usuario: string;
    nombre: string;
    password: string;
    foto: string;
	//extension: string;
    //image: string;

}

export class User3 {

    constructor(username, name, password, foto, extension, image){
        this.username = username;
        this.name = name;
        this.password = password;
        this.foto = foto;
        this.extension = extension;
        this.image = image;
    }

    id: string;
    username: string;
    name: string;
    password: string;
    foto: string;
	extension: string;
    image: string;

}