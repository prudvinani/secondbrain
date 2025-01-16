<div className="flex flex-1">
<div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
  <div className="flex justify-between p-10">
    <p className="font-bold text-4xl"> Mybrain</p>

    <div className="flex items-center">
      {/* <Button className="mr-3">+ Create New</Button> */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button className="mr-3">+ Create New</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="md:w-[450px] w-[350px]">
          <p className="cursor-pointer text-right block ml-60 md:ml-80 text-2xl">
            <p
              className="font-semibold text-2xl"
              onClick={() => setOpen(false)}
            >
              x
            </p>
          </p>
          <AlertDialogHeader>
            <Label className="text-left">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
            <Label className="text-left">
              {type === "notes" ? "Description" : "Link"}
            </Label>
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder={
                type === "notes" ? "Enter your description" : "Enter link"
              }
            />
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-3 w-full">
            <Select
              onValueChange={(value) =>
                setType(
                  value as
                    | "youtube"
                    | "twitter"
                    | "notes"
                    | "documentation"
                    | "links"
                )
              }
              defaultValue={type}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Content Type</SelectLabel>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="notes">Notes</SelectItem>
                  <SelectItem value="links">Links</SelectItem>
                  <SelectItem value="documentation">Article</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </AlertDialogFooter>
          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
        </AlertDialogContent>
      </AlertDialog>

      {/* <Button className="mr-2"> <CiShare2/> Share</Button> */}

      <>
        <Button
          variant="default"
          onClick={() => {
            setIsOpen(true);
          }}
          
        >
        <CiShare2/> Share 
        </Button>

        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent className="w-[370px] md:w-[550px]">
            <AlertDialogHeader>
              <h3 className="font-semibold">Share Your Second Brain</h3>
              <p>
                Share your entire collection of notes, documents, tweets,
                and videos with others.
              </p>
            </AlertDialogHeader>
            {shareLink && (
              <div className="flex flex-col items-center mt-4">
                <QRCodeCanvas value={shareLink} size={150} />{" "}
                {/* QR Code */}
                <p className="text-sm mt-2">
                  Scan this QR code or use the link above.
                </p>
              </div>
            )}
            <div className="flex items-center justify-center">
              <AlertDialogFooter>
                {!shareLink && (
                  <AlertDialogAction
                    onClick={handleShare}
                    className="mt-2 md:mt-0"
                  >
                    <FaPaste /> Generate Share Link
                  </AlertDialogAction>
                )}
                {shareLink && (
                  <AlertDialogAction
                    onClick={handleNavigate}
                    className="mt-2 md:mt-0"
                  >
                    Go to Shared Brain
                  </AlertDialogAction>
                )}
                <AlertDialogCancel
                  onClick={() => setIsOpen(false)}
                  className="pt-2"
                >
                  Cancel
                </AlertDialogCancel>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </>
    </div>
  </div>

  {/* i want only this part should be scroll to y  */}
  <div className="flex-1 overflow-y-auto">
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
        {content.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            title={item.title}
            link={item.link}
            type={item.type}
            onDelete={deleteContent}
          />
        ))}
      </div>
    </div>
  </div>
</div>
</div>