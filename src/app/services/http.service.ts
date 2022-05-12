import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, HttpOptions } from '@capacitor-community/http';
import { from } from 'rxjs';
import { User } from '../model/User';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  doGet(url){
    const options : HttpOptions = {
      url,      
    };
    return from(Http.get(options));
  }

  doPost(url, par){
    const options : HttpOptions = {
      url,
      headers: { 'Content-Type': 'application/json'},
      data : par
    }
    return from(Http.post(options))
  }

  doPostUser(url){
    const options : HttpOptions = {
      url
    }
    return from(Http.post(options))
  }

  doPostPunto(url, par){
    const options : HttpOptions = {
      url,
      headers: { 'Content-Type': 'application/json'},
      data : par
    };
    return from(Http.post(options));
  }

  doPut(url, par){
    const options : HttpOptions = {
      url,
      headers: { 'Content-Type': 'application/json'},
      data : par
    }
    return from(Http.put(options))
  }

  doPutEstado(url){
    const options : HttpOptions = {
      url,
      headers: { 'Content-Type': 'application/json'},
    }
    return from(Http.put(options))
  }

  doPutImg(url, par){
    const options : HttpOptions = {
      url,
      headers: { 'Content-Type': 'application/json'},
      data : par
    }
    return from(Http.put(options))
  }

  doDelete(url){
    const options : HttpOptions = {
      url,      
    };
    return from(Http.del(options));
  }
}
