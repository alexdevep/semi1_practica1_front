import { Component, OnInit } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { UserService } from '../../services/user.service';
import { User, User2 } from 'src/app/models/user';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
  providers: [UserService]
})
export class CameraComponent implements OnInit {

  contentType: string;
  blob: string;
  usser: User2;

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  //public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    //console.info('received webcam image', webcamImage);
    //console.info('received webcamImage.imageAsBase64', webcamImage.imageAsBase64);
    this.webcamImage = webcamImage;
    
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public loginPhoto(usuario: string):void {
    //console.info('received webcamImage.imageAsBase64', webcamImage.imageAsBase64);
    this.contentType = "image/png";

    var user = new User("",usuario,"","",this.webcamImage.imageAsBase64);
    console.log(user);

    this.userService.loginFace(user)
      .subscribe(res => {
        this.usser = res as User2;
        console.log("Resultado: ",this.usser);
        localStorage.setItem('id', this.usser.id);
      });
  }
 
}
