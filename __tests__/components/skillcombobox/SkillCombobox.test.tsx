import React from "react";
import { render, fireEvent, screen, waitFor, prettyDOM } from "@testing-library/react";
import SkillCombobox from "@/components/SkillComboBox";
import Endorsements from "@/pages/endorsements";
import { skillMockData } from "../../../__mocks__/endorsements";

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('SkillCombobox Component', () => {

  it('skillbox compnent in the endorsement page', () => {

    render(<Endorsements />);

    const skillCombobox = screen.getByRole("combobox");

    expect(skillCombobox).toBeInTheDocument();
   
  });

  it('should open dropdown on button click and display the options', async () => {
    render(<SkillCombobox options={skillMockData} placeholder="select skill"  />);

    const button = screen.getByRole('button');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument(); // Check listbox is initially closed

    fireEvent.click(button);

    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for dropdown animation

    await screen.findByRole('listbox');

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Go')).toBeInTheDocument();
    expect(screen.getByText('Vanilla JS')).toBeInTheDocument();

  });


  it('Select a value from the combobox list', async() => {
    const onChangeMock = jest.fn();
    render(<SkillCombobox options={skillMockData} placeholder="select skill" onChange={onChangeMock} value={null} />);
    const button = screen.getByRole('button');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument(); // Check listbox is initially closed

    fireEvent.click(button);

    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for dropdown animation

    await screen.findByRole('listbox');

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Go')).toBeInTheDocument();
    expect(screen.getByText('Vanilla JS')).toBeInTheDocument();

    fireEvent.click(screen.getByText('React'));
    expect(onChangeMock).toHaveBeenCalledWith({ id: 1, skill: 'React' });
  });

   it('filters the options based on input value', async () => {
      render(<SkillCombobox value="" onChange={() => {}} placeholder="select skill" options={skillMockData} />);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument(); 
      const button = screen.getByRole('button');
      fireEvent.click(button);
      await screen.findByRole('listbox');
  
      const input = screen.getByPlaceholderText('select skill');
      fireEvent.change(input, { target: { value: 'React', id: 1 } });

      await waitFor(() => {
      expect(screen.getByText('React')).toBeInTheDocument();
      });

      screen.debug();
    });

  it('Display Add new Skill option when no options are present', async() => {

   
    render(<SkillCombobox options={skillMockData}  placeholder="select skill" value={null}/>);
    const input = screen.getByRole('combobox');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument(); // Check listbox is initially closed

    fireEvent.change(input, { target: { value: 'NonexistentSkill' } });

    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for dropdown animation

    await screen.findByRole('listbox');

    await screen.findByText('Add New Skill');
  });


});