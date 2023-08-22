
const ErrorPage = () => {

    return (


        //         <div >

        //             <div class="container bootstrap snippets bootdey"/>
        //     <div class="row">
        //         <div class="col-md-12">
        //             <div class="pull-right" >
        //                 <div class="col-md-10 col-md-offset-1 pull-right">
        //                     <img class="img-error" src="https://bootdey.com/img/Content/fdfadfadsfadoh.png"/>
        //                     <h2 align = "center">404 Not Found</h2>
        //                     <p align = "center">Sorry, an error has occured, Requested page not found or cnat be accessed!</p>
        //                     <div >


        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div>
            <nav class="navbar bg-body-tertiary  navbar-expand-lg bg-dark navbar-dark">
                <div class="container-fluid">
                    <span class="navbar-brand">E-Learning <i class="bi bi-book-half"></i></span>
                </div>
            </nav>
            <div class="page-404">
                <div class="outer">
                    <div class="middle">
                        <div class="inner">

                            <div class="inner-circle"><i class="fa fa-home"></i><span>404</span></div>
                            <span class="inner-status">Oops! You're lost</span>
                            <span class="inner-detail">
                            Requested page not found!
                                <a href="/" class="btn btn-info mtl"><i class="fa fa-home"></i>&nbsp;
                                    Return home
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ErrorPage