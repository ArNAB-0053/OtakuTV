<DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <HiOutlineMenuAlt1 size={26} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                allign="start"
                className="ml-5 mt-2 cursor-pointer bg-background"
              >
                {menuItems.map((item, index) => (
                  <div key={index}>
                    <DropdownMenuItem
                      className={`cursor-pointer py-4 px-3 hover:bg-none rounded-none uppercase text-[0.8rem] ${
                        index % 2 === 0
                          ? "bg-[#212635] hover:bg-[#242a39]"
                          : "bg-bgitem hover:bg-[#252b3a]"
                      }`}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                    <div className=""></div>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>