import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Animedetail = ({
  type,
  premiered,
  season,
  year,
  status,
  duration,
  studios,
  eps,
  aired,
  japanese,
  genres,
  themes,
  producers,
}) => {
  return (
    <>
      <div className="flex items-start justify-start md:gap-x-16 md:mt-4 lg:gap-x-0 xl:gap-x-16 flex-col md:flex-row">
        <Table className="Table">
          <TableBody className="tablebody">
            <TableRow className="TableRow">
              <TableCell className="TableCell font-medium">Type:</TableCell>
              <TableCell className="TableCellText text-left ">{type}</TableCell>
            </TableRow>
          </TableBody>
          <TableBody className="tablebody">
            <TableRow className="TableRow">
              <TableCell className="TableCell font-medium">
                Premiered:
              </TableCell>
              <TableCell className="TableCellText text-left ">
                {(() => {
                  if (season !== null && year !== null) {
                    return `${season} ${year}`;
                  }
                  return premiered;
                })()}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody className="tablebody">
            <TableRow className="TableRow">
              <TableCell className="TableCell font-medium">Status:</TableCell>
              <TableCell className="TableCellText text-left ">
                {status}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody className="tablebody">
            <TableRow className="TableRow">
              <TableCell className="TableCell font-medium">Duration:</TableCell>
              <TableCell className="TableCellText text-left ">
                {duration}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody className="tablebody">
            <TableRow className="TableRow">
              <TableCell className="TableCell font-medium">Studios:</TableCell>
              <TableCell className="TableCellText text-left ">
                {studios}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table className="Table">
          <TableBody className="tablebody">
            <TableRow className="TableRow">
              <TableCell className="TableCell font-medium">Japanese:</TableCell>
              <TableCell className="TableCellText text-left ">
                {japanese}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody className="tablebody">
            <TableRow className="TableRow">
              <TableCell className="TableCell font-medium">Episodes:</TableCell>
              <TableCell className="TableCellText text-left ">{eps}</TableCell>
            </TableRow>
          </TableBody>
          <TableBody className="tablebody">
            <TableRow className="TableRow">
              <TableCell className="TableCell font-medium">Aired:</TableCell>
              <TableCell className="TableCellText text-left ">
                {aired}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody className="tablebody">
            <TableRow className="TableRow">
              <TableCell className="TableCell font-medium">Themes:</TableCell>
              <TableCell className="TableCellText text-left ">
                {themes}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody className="tablebody">
            <TableRow className="TableRow">
              <TableCell className="TableCell font-medium">Genres:</TableCell>
              <TableCell className="TableCellText text-left max-md:w-[24rem]">
                {genres}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <Table className="Table">
        <TableBody className="tablebody">
          <TableRow className="TableRow">
            <TableCell className="TableCell font-medium">Producers:</TableCell>
            <TableCell className="TableCellText text-left md:w-[24rem]">
              {producers}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default Animedetail;
