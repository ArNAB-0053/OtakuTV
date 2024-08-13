{/* 
                
                IDEA : AT THE RIGHT SIDE OF THE TRAILER I WILL CREATE TWO MORE THINGS CHARACTERS AND STAFF AND THAT WILL BE LIKE A BUTTON WILL BE THERE WHEN USE CLICK IT IT THE SAME WINDOW NEW DIV TYPE SOMETHING WILL COME UP LIKE A LOGGIN THING AND THERE WILL BE THE CHARACTERS OR STAFF AS CHOOSEN. AND ALSO A SEARCHING OPTION WILL BE THERE IF ANYONE SEARCH ANYONE BY NAME FOR STAFF, AND FOR CHARACTERS VOICE ACTOR WILL BE THERE FOR DIFFERNT LANGUAGE LIKE ENG, JAP, PORTUGESE ETC. AND KIND OF OF A DRAWER OR A TABLE WILL BE THERE FROM WHICH USER CAN SELECT THE LANGUAGE'S VOICE ACTOR ALSO SEARCH OPTION WILL BE PRESENT FOR IF SOMEONE WANTS TO CHECK SOMEONE VA. 
                
                */}


{isViewingAll && (
          <div className="fixed bg-white/30 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-3 place-items-start gap-x-16 gap-y-6">
              {stafff?.length > 0 &&
                stafff.map((staffff) => {
                  return (
                    <Fetchstaff
                      url={staffff.person?.url}
                      image_url={staffff?.person?.images?.jpg.image_url}
                      positions={staffff.positions}
                      name={staffff.person?.name}
                    />
                  );
                })}
            </div>
          </div>