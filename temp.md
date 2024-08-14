{/* 
                
                IDEA : AT THE RIGHT SIDE OF THE TRAILER I WILL CREATE TWO MORE THINGS CHARACTERS AND STAFF AND THAT WILL BE LIKE A BUTTON WILL BE THERE WHEN USE CLICK IT IT THE SAME WINDOW NEW DIV TYPE SOMETHING WILL COME UP LIKE A LOGGIN THING AND THERE WILL BE THE CHARACTERS OR STAFF AS CHOOSEN. AND ALSO A SEARCHING OPTION WILL BE THERE IF ANYONE SEARCH ANYONE BY NAME FOR STAFF, AND FOR CHARACTERS VOICE ACTOR WILL BE THERE FOR DIFFERNT LANGUAGE LIKE ENG, JAP, PORTUGESE ETC. AND KIND OF OF A DRAWER OR A TABLE WILL BE THERE FROM WHICH USER CAN SELECT THE LANGUAGE'S VOICE ACTOR ALSO SEARCH OPTION WILL BE PRESENT FOR IF SOMEONE WANTS TO CHECK SOMEONE VA. 
                
                */}


{characters.length > 0 &&
        characters.slice(0, 6).map((character) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div>
              <FetchCharacters
                char_image_url={character.character?.images?.jpg?.image_url}
                char_name={character.character?.name}
                role={character && character.role}
              />
              <FetchVoiceActor
                vc_image_url={
                  character.voice_actors[0].person?.images?.jpg?.image_url
                }
                vc_name={character.voice_actors[0].person?.name}
                lang={
                  character.voice_actors && character.voice_actors[0].language
                }
              />
            </div>
          );
        })}