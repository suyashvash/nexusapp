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
            form: 'AI Mail Generator',
            results: 'Result',
        },

        analysis:{
            tag: 'analysisTag',
            form: 'AI Profile Analysis',
            results: 'Your Analysis',
        },
        
        settings: 'Settings',


    }
}