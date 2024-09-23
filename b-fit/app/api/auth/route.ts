// pages/api/auth/[...nextauth].ts

import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import { options } from './options';

const handler = NextAuth(options);

export {handler as GET, handler as POST}

//export default NextAuth(authConfig);
