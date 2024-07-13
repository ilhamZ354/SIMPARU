const Footer = () =>{
        return (
            <div className="flex w-full mt-8 bg-stone-50 border-t-2 border-t-slate-200">
                <div className="flex w-full ml-2">
                    <div className="grid grid-flow-row w-full">
                        <div className="flex w-full mt-4 bottom-0 mb-0">
                            <h3 className="font-bold text-lg font-sans text-slate-300">Maker for :</h3>
                        </div>
                        <div className="flex w-full text-slate-300 text-xs mt-2 mb-2">
                        <ul>
                                <li>Manajemen Informatika Politeknik Negeri Medan</li>
                                <li>SMKS Muhammadiyah 10 Kisaran</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
};

export default Footer;