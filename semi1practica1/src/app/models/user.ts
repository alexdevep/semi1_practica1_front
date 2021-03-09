export class User {

    constructor(_id='', username='', name='', password='', foto=''){
        this._id = _id;
        this.username = username;
        this.name = name;
        this.password = password;
        this.foto = foto;
    }

    _id: string;
    username: string;
    name: string;
    password: string;
    foto: string;
	//extension: string;
    //image: string;

}
