"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  createLessonNextAction,
  updateLessonNextAction,
} from "@/actions/lessons/actions.lessons";
import { LessonState } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent } from "../ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Fragment, useState } from "react";
import { getCourses } from "../../../app/courses/courses.query";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

export const LessonFormSchema = z.object({
  name: z.string().min(3).max(40).optional(),
  rank: z.string().optional(),
  content: z.string().optional(),
  state: z.nativeEnum(LessonState).optional(),
  courses: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
});

export type LessonFormSchema = z.infer<typeof LessonFormSchema>;

export type LessonFormProps = {
  defaultValue?: LessonFormSchema & {
    id: string;
  };
};

export const LessonForm = async (defaultValue: LessonFormProps) => {
  const {
    name,
    content,
    rank,
    courses: coursesBis,
    state,
    id,
  } = {
    ...defaultValue.defaultValue,
  };

  const courses = [
    {
      name: "celebrer vetus vulgivagus",
      image: "https://loremflickr.com/640/480?lock=160271926558720",
      presentation:
        "Verbum apostolus brevis vel tibi sapiente cupiditate cubicularis accusator accusator. Volaticus calcar argumentum fuga tepesco fugit. Aveho caecus pecus venia tabgo.",
      id: "clrgu4asn0005fi9heia238t5",
      creator: { image: null, name: null },
    },
    {
      name: "veritas clarus tum",
      image: "https://picsum.photos/seed/pyc5slS3R2/640/480",
      presentation:
        "Sufficio voveo amet crur cruciamentum amo. Curso degenero cedo tondeo attollo tenus amet curvo. Baiulus ratione ventito demonstro rem cimentarius doloribus.",
      id: "clrgu4ast0009fi9hp4j5ut8q",
      creator: { image: null, name: null },
    },
    {
      name: "esse valde harum",
      image: "https://picsum.photos/seed/OmZ3YZceBW/640/480",
      presentation:
        "Anser accusantium constans casso. Tabernus triduana pecco sol tardus distinctio deputo rem labore charisma. Alioqui careo versus copiose usque iure reiciendis.",
      id: "clrgu4at7000hfi9h6r67v0yk",
      creator: { image: null, name: null },
    },
    {
      name: "tenuis molestiae vulticulus",
      image: "https://picsum.photos/seed/U6ul7F/640/480",
      presentation:
        "Creber defendo ipsum illum nulla. Contra compono vulariter copiose cedo. Adulescens cognatus ulterius vulnus adfero.",
      id: "clrgu4ate000lfi9hvdt0aexj",
      creator: { image: null, name: null },
    },
    {
      name: "totam valde saepe",
      image: "https://loremflickr.com/640/480?lock=7447757839138816",
      presentation:
        "Tendo crebro comburo enim deporto error tertius certus. Ager claudeo xiphias tabgo saepe allatus aliquam. Pectus utroque adeo nesciunt tredecim alter crudelis angulus cetera.",
      id: "clrgu4atl000pfi9hpeu6qjcf",
      creator: { image: null, name: null },
    },
    {
      name: "delectus astrum audacia",
      image: "https://picsum.photos/seed/GfVYtrVP/640/480",
      presentation:
        "Coaegresco apto aperio conscendo quaerat angelus soleo delectatio centum catena. Tonsor amor infit caste vereor deduco antepono. Utilis cenaculum cervus terreo studio cur tum curia.",
      id: "clrgu4ats000tfi9h7bjyclgv",
      creator: { image: null, name: null },
    },
    {
      name: "cariosus spoliatio contigo",
      image: "https://loremflickr.com/640/480?lock=5418493000286208",
      presentation:
        "Cognomen tibi bellicus arguo abscido tero ante architecto. Fugiat expedita certe vicissitudo. Brevis consectetur volup creta territo stips volup abduco decumbo cupressus.",
      id: "clrgu4au50011fi9hoon6gukl",
      creator: { image: null, name: null },
    },
    {
      name: "sqddqsdq",
      image: "https://picsum.photos/seed/ynnlGfMMYf/640/480",
      presentation:
        "Appello peccatus alii impedit. Nostrum sto creator. Ad iste sub provident ventito.",
      id: "clrgu4atz000xfi9hjr0em6ng",
      creator: {
        image: "https://avatars.githubusercontent.com/u/36336137?v=4",
        name: "SebastienH",
      },
    },
    {
      name: "New Course",
      image: "https://loremflickr.com/640/480?lock=6014328123686912",
      presentation: "The presentation",
      id: "c1b2e4ff-d48f-42a5-bec3-c58fd9e5be70",
      creator: {
        image: "https://avatars.githubusercontent.com/u/36336137?v=4",
        name: "SebastienH",
      },
    },
    {
      name: "New Course again",
      image: "https://loremflickr.com/640/480?lock=6014328123686912",
      presentation: "The presentation",
      id: "e89d76b5-d859-4674-ab91-50a9d4b56a11",
      creator: {
        image: "https://avatars.githubusercontent.com/u/36336137?v=4",
        name: "SebastienH",
      },
    },
    {
      name: "teres undique triumphus",
      image: "https://picsum.photos/seed/5NUaWwMj3/640/480",
      presentation:
        "Carmen stabilis omnis aut sufficio. Voluptas culpo tergo venustas sequi vetus denuncio sit. Sodalitas aranea conitor.",
      id: "clrgu4arx0001fi9hjxlfukm1",
      creator: {
        image: "https://avatars.githubusercontent.com/u/36336137?v=4",
        name: "SebastienH",
      },
    },
    {
      name: "tactus tonsor textilis",
      image: "https://loremflickr.com/640/480?lock=6014328123686912",
      presentation:
        "Utrimque cornu confugo peccatus cupiditate tactus. Censura deinde ascisco tego pauci suggero utilis perspiciatis corrupti. Textor surculus quas cupio demens.",
      id: "clrgu4at0000dfi9hw6id1mf6",
      creator: {
        image: "https://avatars.githubusercontent.com/u/36336137?v=4",
        name: "SebastienH",
      },
    },
  ];
  const [open, setOpen] = useState(false);
  console.log("courses SHE BIS: ", courses);
  // const
  return (
    <form
      className="flex flex-col"
      onSubmit={async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name") as string;
        const rank = formData.get("rank") as string;
        const content = formData.get("content") as string;
        const state = formData.get("state") as LessonState;
        const courseId = formData.get("courseId") as string;
        const lesson = {
          name,
          rank,
          content,
          state,
          courseId,
        };
        if (!id)
          return await createLessonNextAction({
            data: lesson,
          });

        await updateLessonNextAction({
          data: lesson,
          lessonId: id,
        });
      }}
    >
      <Label>Lesson Name</Label>
      <Input defaultValue={name} name="name" id="name" />
      <Label>Lesson rank</Label>
      <Input defaultValue={rank} name="rank" id="rank" />
      <Label>Lesson Presentation</Label>
      <Input defaultValue={content} name="content" id="content" />
      <Label>Parent Course</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            Select course
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          {courses?.map((courseItem, index) => {
            return (
              <CommandItem value={courseItem.name} key={courseItem.id}>
                <Check />
                {courseItem.name}
              </CommandItem>
            );
          })}
        </PopoverContent>
      </Popover>

      {
        //   <Popover>
        //   <PopoverTrigger asChild>
        //     <Button variant="outline" role="combobox">
        //       Select course
        //       <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        //     </Button>
        //   </PopoverTrigger>
        //   <PopoverContent className="w-[200px] p-0">
        //     <Command>
        //       <CommandInput placeholder="Select course..." />
        //       <CommandEmpty>No course found.</CommandEmpty>
        //       <CommandGroup>
        //         {courses?.map((courseItem, index) => {
        //           return (
        //             <CommandItem value={courseItem.name} key={courseItem.id}>
        //               <Check />
        //               {courseItem.name}
        //             </CommandItem>
        //           );
        //         })}
        //       </CommandGroup>
        //     </Command>
        //   </PopoverContent>
        // </Popover>
      }
      <Label>Lesson Presentation</Label>
      <Input defaultValue={state} name="state" id="state" />
      <Button type="submit">Submit Changes</Button>
    </form>
  );
};
