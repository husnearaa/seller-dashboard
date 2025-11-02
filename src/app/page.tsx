// "use client"

// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// const Home = () => {
//     const router = useRouter();

//     useEffect(() => {
//       return  router.replace('/seller-dashboard');
//     }, [router]);
// };

// export default Home;



import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/seller-dashboard');
}
