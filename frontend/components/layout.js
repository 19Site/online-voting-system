import Link from 'next/link';

export default function Layout({ children }) {

    return (

        <>

            <div className='container'>

                <div className='row'>

                    <div className='col-2'>

                        <div className='py-3'>

                            <Link

                                href={{

                                    pathname: '/users'
                                }}
                            >

                                <a className='text-decoration-none'>

                                    Users
                                </a>
                            </Link>
                        </div>

                        <div className='py-3'>

                            <Link

                                href={{

                                    pathname: '/campaigns'
                                }}
                            >

                                <a className='text-decoration-none'>

                                    Campaigns
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className='col'>

                        <div>{children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}