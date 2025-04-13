import { Settings } from "react-native";

export const Routes = {
    auth: {
        tag: 'auth',
        welcome: 'Welcome',
        login: 'Login',
        register: 'Register',
        forgotPassword: 'Forgot Password',
    },
    app: {
        tag: 'app',
        dashboard: {
            tag: 'dashboard',
            overview: 'Overview',
            card: {
                tag: 'card',
                detail: 'Card Detail',
                create: 'Create Card',
                list: 'List Card',
                edit: 'Edit Card',
            }
        },

        coldMailer: {
            tag: 'coldMailer',
            form: 'Cold mailer',
            results: 'Cold mailer Results',
        },

        analysis:{
            tag: 'analysisTag',
            form: 'Score Analysis',
            results: 'Analysis Results',
        },
        
        settings: 'Settings',


    }
}