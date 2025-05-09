import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig(({mode}) => {
	return {
		server: {
			https: mode !== 'development',
			port: 3000,
		},
		plugins: [react(), mkcert()],
	}
})
