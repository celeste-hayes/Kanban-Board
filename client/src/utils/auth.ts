import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  loggedIn() {
    const token = this.getToken();
    if(token){
      return !this.isTokenExpired(token);
    } else{
        return false;
    }
  }
  
  isTokenExpired(token: string) {
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (!decodedToken.exp) {
        console.log('Token has no expiry date');
        return false;
    }

    const expirationDate = new Date(decodedToken.exp * 1000);
    const now = new Date();
    return expirationDate < now;
  }

  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout(navigate: (path:string) => void) {
    localStorage.removeItem('id_token');
    navigate('/login');
  }
}

export default new AuthService();
