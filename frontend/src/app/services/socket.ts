import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class SocketService {

private socket: Socket;

  constructor() {
    this.socket = io(environment.apiUrl);
  }
  updatePokemon(data: any): void {
    this.socket.emit('updatePokemon', data)
  }
  onUpdatePokemon(callback: (data: any) => void): void {
    this.socket.on('updatePokemon', callback);
  }
  // Method to send message to the server
  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  // Observable to receive messages from the server
  onMessage(callback: (message: string) => void): void {
    this.socket.on('message', callback);
  }

}