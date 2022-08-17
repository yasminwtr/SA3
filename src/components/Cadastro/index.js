import React from 'react'
import './styles.css'
import logo from '../assets/img/logo.png'
import { FaUser } from 'react-icons/fa'
import { BsFillTelephoneFill } from 'react-icons/bs'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import RiLockPasswordFill from 'react-icons/ri'
import LockOpenIcon from '@mui/icons-material/HttpsRounded';
import CalendarIcon from '@mui/icons-material/CalendarMonthRounded';
import { Link } from 'react-router-dom'
import { Formik } from "formik";
import * as Yup from "yup";
import api from "../../api/";

const Cadastro = () => {
  const [values, setValues] = React.useState({

    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function registerNewUser() {
    let fullName = document.getElementById('fullName').value
    let email = document.getElementById('email').value
    let phoneNumber= document.getElementById('phoneNumber').value
    let password = document.getElementById('password').value
    console.log('fullName:',fullName,'\n','email:',email,'\n','phoneNumber',phoneNumber,'\n','password:',password);
    
    try {
      // console.log('fullName.value', fullName);
      const response = await api.post('/registerUser', { fullName, email, password, phoneNumber });
      console.log('response registerUser:', response);
    } catch (error) {
      console.log(error)
    }
  }

  
  return (
    <Formik
      initialValues={{ fullName: "", email: "", phoneNumber: "", birthDate: "", password: "" }}
      onSubmit={(valuesForm, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Valores pegos dos inputs:", values);
          setSubmitting(false);
        }, 500);
      }}

      validationSchema={Yup.object().shape({
        fullName: Yup.string()
          .required(''),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required(''),
        phoneNumber: Yup.string()
          .required(''),
        password: Yup.string()
          .required('')
          .min(8, 'A senha deve ter no minímo 8 caracteres')
      })}
    >
      {props => {
        const {
          // valuesForm,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit
        } = props;

        return (
          <form onSubmit={handleSubmit}>
            <div>
              <div className='header-cadastro'>
                <img className='logo-cadastro' src={logo} />
              </div>
              <div className='container-cadastro'>
                <div className='box-cadastro'>
                  <div>
                    <h1 className='h1-cadastro'>Crie sua conta!</h1>
                  </div>
                  <div className='form-cadastro'>
                    <div className='containerInputRegister'>
                      <FaUser id='iconRegister' />
                      <input
                        name="fullName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.fullName && touched.fullName && "error"}
                        id='fullName'
                        placeholder='Nome completo'
                        type={'text'}
                      />
                    </div>
                    <div className="input-feedback">{errors.fullName}</div>
                    <div className='containerInputRegister'>
                      < EmailIcon id='iconRegister' />
                      <input
                        id='email'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email && touched.email && "error"}
                        placeholder='E-mail'
                      />
                    </div>
                    <div className="input-feedback">{errors.email}</div>
                    <div className='containerInputRegister'>
                      <BsFillTelephoneFill id='iconRegister' />
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.phoneNumber && touched.phoneNumber && "error"}
                        id='phoneNumber'
                        type={'tel'}
                        placeholder='Celular' />
                    </div>

                    <div className='containerInputRegister'>
                      <CalendarIcon id='iconRegister' />
                      <input
                        className='inputRegister'
                        type={'date'}
                        />
                      {/* <input className='inputRegister' type={'date'}/> */}
                    </div>

                    <div className='containerInputRegister' >
                      <LockOpenIcon id='iconRegister' />
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password && touched.password && "error"}
                        placeholder='Senha'
                        id='password'
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password} />
                      <div>
                        <IconButton sx={{ color: '#655A78' }}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </div>
                    </div>
                    <div className="input-feedback">{errors.password}</div>

                    <div>
                      <button type='submit' onClick={() => registerNewUser()} disabled={isSubmitting} className='button-cadastro'>Cadastrar</button>
                      <div>
                        <label className='label-cadastro'>Já possui uma conta?</label>
                        {/* <a className='a-cadastro' href=''>Entre</a> */}
                        <a href="/Login" className='a-cadastro'><Link to='/Login' className='a-cadastro'> Entrar</Link></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )
      }
      }
    </Formik>
  )


}
export default Cadastro