import { useState, createContext, useEffect } from "react";
import firebase from "../services/firebaseConnection";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadStorage() {
      const storageUser = localStorage.getItem("SistemaUser");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  //Fazendo login do usuario
  async function signIn(email, password) {
    setLoadingAuth(true);

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const userProfile = await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .get();

        let data = {
          uid: uid,
          nome: userProfile.data().nome,
          avatarUrl: userProfile.data().avatarUrl,
          email: value.user.email,
          categoria: userProfile.data().categoria,
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success("Bem vindo de volta!");
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          "alerta de erro! Ocorreu um problema ao fazer login. Verifique seu e-mail e senha ou crie uma conta."
        );
        setLoadingAuth(false);
      });
  }

  //Cadastrando um novo usuario
  async function signUp(email, password, nome, categoria) {
    setLoadingAuth(true);

    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .set({
            nome: nome,
            avatarUrl: null,
            categoria: categoria,
          })
          .then(() => {
            let data = {
              uid: uid,
              nome: nome,
              email: value.user.email,
              avatarUrl: null,
              categoria: categoria,
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success("Bem vindo a plataforma!");
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ops algo deu errado!");
        setLoadingAuth(false);
      });
  }

  function storageUser(data) {
    localStorage.setItem("SistemaUser", JSON.stringify(data));
  }

  //Logout do usuario
  async function signOut() {
    await firebase.auth().signOut();
    localStorage.removeItem("SistemaUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signUp,
        signOut,
        signIn,
        loadingAuth,
        setUser,
        storageUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
